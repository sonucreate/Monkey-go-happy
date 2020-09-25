var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup;
var score = 0;
var gameState = 1;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOver1 = loadImage("GameOver.jpg");

}



function setup() {
  createCanvas(600, 400);
  monkey = createSprite(70, 300, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  FoodGroup = new Group();
  obstaclesGroup = new Group();

  gameOver = createSprite(300, 200, 20, 20);
  gameOver.addImage("gameover", gameOver1);
  gameOver.scale = 0.4;

  
  ground = createSprite(400, 350, 900, 10);
}


function draw() {
  background("white");
  if (gameState === 1) {
     gameOver.visible = false
    monkey.velocityY = monkey.velocityY + 2;
    //monkey.visible = true;
   
    
    fruits();
    obstacle();
    
    
    if (ground.x < 300) {
      ground.x = ground.x = 400;
    }
    ground.velocityX = -4;
    if (keyDown("space") && monkey.y > 200) {
      monkey.velocityY = -12;
    }
    stroke("white");
    textSize(20);
    fill("blue");
    text("Score=" + score, 500, 50);

    stroke("white");
    textSize(20);
    fill("red");
    var survivalTime = Math.ceil(frameCount / frameRate());
    text("SurvivalTime=" + survivalTime, 50, 50);

    if (FoodGroup.isTouching(monkey)) {
      score = score + 1;
      FoodGroup.destroyEach();
    }
    if (obstaclesGroup.isTouching(monkey)) {
      //monkey.destroy();
      gameState = 0;
    }
    
    
  }
  else if (gameState === 0) {
    ground.velocityX = 0;
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    gameOver.visible = true;
    if(mousePressedOver(gameOver)&& gameState === 0) {
   
    gameState =1;
       reset();
  }

 
  }

  monkey.collide(ground)  
  drawSprites();
  console.log(gameState);
  
 
}

function fruits() {
  if (frameCount % 80 === 0) {
    fruit = createSprite(600, Math.round(random(120, 200)), 20, 20);
    fruit.addImage("banana", bananaImage);
    fruit.scale = 0.07;
    fruit.velocityX = -10;
    fruit.lifetime = 100;
    FoodGroup.add(fruit);

  }
}


function obstacle() {
  if (frameCount % 300 === 0) {
    obstacles = createSprite(600, 310, 20, 20);
    obstacles.collide(ground);
    obstacles.addImage("stone", obstacleImage);
    obstacles.scale = 0.2;
    obstacles.velocityX = -10;
    obstacles.lifetime = 100;
    obstaclesGroup.add(obstacles);

  }
}

function reset() {
  
  //gameOver.visible = false;
  //background("white");
  monkey.visible = true;
  gameState = 1;
  obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();
}