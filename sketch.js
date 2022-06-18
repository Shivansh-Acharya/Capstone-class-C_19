var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var spookySound
var gameOver, gameOverImg

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  gameOverImg = loadImage("download.jpeg")
}

function setup() {
  createCanvas(600, 600);
  spookySound.play()

  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()

  ghost = createSprite(300, 300)
  ghost.addImage(ghostImg)
  ghost.scale = 0.40
}

function draw() {
  background(0);

  if (tower.y > 400) {
    tower.y = 300
  }

  if (keyDown("space")) {
    ghost.velocityY -= 5
  }
  ghost.velocityY += 0.5
  if (keyDown("right_arrow")) {
    ghost.x += 5
  }
  if (keyDown("left_arrow")) {
    ghost.x -= 5
  }

  if (climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0
  }

  if (invisibleBlockGroup.isTouching(ghost)) {
    gameState = "end"
    ghost.destroy()
  }

  if (gameState === "end") {
    gameOver = createSprite(200, 200)
    gameOver.addImage(gameOverImg)
    gameOver.depth = tower.depth
    gameOver.depth += 1
  }

  drawSprites();
  spawnDoor()
}

function spawnDoor() {
  if (frameCount % 120 === 0) {
    door = createSprite(200, -50, 20, 20)
    door.addImage(doorImg)
    door.velocityY = 1

    climber = createSprite(200, 10, 20, 20)
    climber.addImage(climberImg)
    climber.velocityY = 1

    invisibleBlock = createSprite(200, 15, 20, 20)
    invisibleBlock.width = climber.width

    climber.velocityY = 1
    invisibleBlock.velocityY = 1
    invisibleBlock.height = 2


    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)

    climber.lifetime = 600
    door.lifetime = 600
    invisibleBlock.lifetime = 600

    door.x = Math.round(random(120, 300))

    climber.x = door.x
    invisibleBlock.x = door.x

    ghost.depth = door.depth
    ghost.depth += 1
    invisibleBlock.visible = false;
  }

}
