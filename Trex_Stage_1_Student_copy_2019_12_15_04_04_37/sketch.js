var trex,trex_running,trex_failed ;
var ground,invisible_ground,ground_image;
var cloud_image,cloud_group;
var obstacle1,obstacle2, obstacle3, obstacle4, obstacle5,obstacle6,obstacle_group;
var score = 0;
var play = 1;
var end = 0;
var gameState = play;
var restart,gameOver,gameOverImage,restartImage
function preload(){
trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
trex_failed = loadImage("trex_collided.png");
ground_image = loadImage("ground2.png");
cloud_image = loadImage("cloud.png");
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");
restartImage = loadImage("restart.png");
gameOverImage = loadImage("gameOver.png");
}

function setup() {
  createCanvas(400, 400);
  trex = createSprite(50,380,20,50);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_failed);
  trex.scale = 0.75;
  ground = createSprite(200,380,400,20);
  ground.addImage("ground",ground_image);
  ground.x = ground.width/2;
  ground.velocityX = -(6+ 3*score/100);
  invisible_ground = createSprite(200,390,400,10);
  invisible_ground.visible = false;
  restart = createSprite(200,250);
  gameOver = createSprite(200,200);
  restart.addImage(restartImage);
  gameOver.addImage(gameOverImage);
  cloud_group = new Group();
  obstacle_group = new Group();
}

function draw() {        
  background("turquoise");
  //jumps when space pressed
  
  if (gameState === play){
   score = score + Math.round(getFrameRate()/60);
   if(keyDown("space")){
  trex.velocityY = -10;
  }
  trex.velocityY = trex.velocityY + 0.5;//adds gravity to jump . 
  trex.collide(invisible_ground);
  
  if (ground.x <0) {
     ground.x = ground.width/2;
    }
  cloud();
  obstacles();
    gameOver.visible = false;
    restart.visible = false;
  if(obstacle_group.isTouching(trex)){
     gameState = end
     }
  }else{
    if(gameState === end){
    ground.velocityX = 0;
    trex.velocityY= 0;
    trex.changeAnimation("collided",trex_failed);
    trex.scale = 0.75; 
    obstacle_group.setVelocityXEach(0);
    obstacle_group.setVelocityXEach(0);
    obstacle_group.setLifetimeEach(-1);
    cloud_group.setLifetimeEach(-1);
    gameOver.visible = true;
    restart.visible = true;
    if (mousePressedOver(restart)){
     gameState  = play;
     gameOver.visible = false;
     restart.visible = false;
     obstacle_group.destroyEach();
     cloud_group.destroyEach();
     trex.changeAnimation("running",trex_running);
     score = 0;
    }
    }
    }
  text("Score: " + score,250,100);
  
  drawSprites();
}

function cloud(){
  if (frameCount%60 === 0) {
    var cloudSprite = createSprite(400,50,50,50);
    cloudSprite.addImage(cloud_image);
    cloudSprite.y = Math.round(random(1,150));
    cloudSprite.velocityX = -5;
    cloud_group.add(cloudSprite);
    console.log(cloudSprite.velocityX);//shows cactus velocity of x position in debug console
    cloudSprite.lifetime = 85;
  }
}

function obstacles(){
  if(frameCount%60 === 0){
    var cactus = createSprite(400,350,40,10);
    cactus.velocityX = -4.79;
    var rand = Math.round(random(1,6));
    
    switch(rand){
      case 1:cactus.addImage(obstacle1);
    break;
      case 2:cactus.addImage(obstacle2);
    break
      case 3:cactus.addImage(obstacle3);
    break
      case 4:cactus.addImage(obstacle4);
    break
      case 5:cactus.addImage(obstacle5);
    break
      case 6:cactus.addImage(obstacle6);
    break
    }
    
    cactus.scale = 0.75;
    cactus.lifetime = 85;
    obstacle_group.add(cactus);
    console.log(cactus.velocityX);//shows cactus velocity of x position in debug console
  }
  }