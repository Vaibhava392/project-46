var player1, player2, image1, image2, backgroundImage
var ground, laserGroup, laserGroup2;
var gameState = 1;
var PLAY = 1;
var END = 0;

function preload(){
  backgroundImage = loadImage("images/warp background.gif")
  image1 = loadImage("images/image 2.gif")
  image2 = loadImage("images/image 1.gif")
}
function setup() {
  createCanvas(400,400);
  ground = createSprite(400,350,800,20)
  ground.shapeColor = "red";
  player1 = createSprite(50,310,36,95)
  player1.addImage(image1)
  player1.visible = true;
  player2 = createSprite(350,310,36,95)
  player2.addImage(image2)
  player2.visible = true;
  laserGroup = createGroup();
  laserGroup2 = createGroup();
}

function draw() {
  background(backgroundImage);
  if (gameState === PLAY){
  if(keyDown("UP_ARROW") && player1.y >= 130){
    player1.velocityY = -9;
  }
  if(keyDown("A") && player2.y >= 130){
    player2.velocityY = -9;
  }
  player1.velocityY = player1.velocityY+ 0.4;
  player2.velocityY = player2.velocityY+ 0.4;
  if(keyDown("SPACE")){
    var laser = createSprite(player1.x,player1.y,20,5)
    laser.velocityX = 9;
    laser.shapeColor = "red"
    laserGroup.add(laser);
    if(player2.isTouching(laserGroup)){
      gameState = END;
      player2.visible = false;
    }
  }
  if(keyDown("SPACE")){
    var laser2 = createSprite(player2.x,player2.y,20,5)
    laser2.velocityX = -9;
    laser2.shapeColor = "blue"
    laserGroup2 = createGroup();
    if(player1.isTouching(laserGroup2)){
      gameState = END;
      player1.visible = false;
    }
  }
} 
if (gameState === END){
  textSize(50);
  text("end",200,200)
  text("press R to restart",10,40)
  if(keyDown("R")){
    gameState = PLAY;
    player1.visible = true;
    player2.visible = true;
  }
}
player1.collide(ground);
player2.collide(ground);
drawSprites();
}