var monkey , monkey_running, monkey1;
var play = 1;
var end = 0;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var ground;
var gameState = play;
var background,backgroundImage;

function preload(){
  
  
     monkey_running =                loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png" ,"sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
     bananaImage = loadImage("banana.png");
     obstacleImage = loadImage("obstacle.png");
     backgroundImage = loadImage("JUNGLE.jpg");
  
}


function setup() {
createCanvas(600,400);

     background=createSprite(300,300,600,600);
     background.addImage(backgroundImage);
    
     //monkey
     monkey=createSprite (70,345,100,100);
     monkey.addAnimation("running",monkey_running);
     monkey.scale=0.15;
     //ground
     ground = createSprite(200,401,800,20);
     //invisibleGround
     invisibleGround = createSprite(200,400,400,10);
     invisibleGround.visible = false;
     //group
     FoodGroup = createGroup();
     obstacleGroup = createGroup();
     //score
     score = 0;
     
  
}


function draw() {


       //score
       fill("black");
       textSize(30);
       text("SURVIVING TIME: "+ score, 50,50);
      
  
       if(gameState === play){
       score = score+Math.round(getFrameRate()/60);
       background.velocityX = -3;
       if(background.x<0){
       background.x = background.width/2;
       
       }
       //spacekey
       if(keyDown("space")&& monkey.y >= 100) {
           monkey.velocityY = -19;
       }
       //monkeyvelocity
       monkey.velocityY = monkey.velocityY +0.88 ;
     
       //spawn
       spawnobstacle();
       spawnfood();

       if(FoodGroup.isTouching(monkey)){
          FoodGroup.destroyEach();
       }
               
       if(obstacleGroup.isTouching(monkey)) {
         gameState = end;
       }
         drawSprites();
       }
  
      if(gameState === end){
        
       fill("black");
       textSize(30);
       text("GAME OVER!! ", 300,200);     
         
       obstacleGroup.destroyEach();
       FoodGroup.destroyEach();
        
       }  
  
  
       monkey.collide(invisibleGround);
  
  

}


function spawnobstacle() {
   
   
       //obstacles
       if (frameCount % 140 === 0){
       obstacle = createSprite(600,366,10,10);
       obstacle.velocityX = -5;
       obstacle.lifetime = 200;
       obstacle.scale = 0.15;
       obstacle.addImage( obstacleImage );   
       obstacleGroup.add(obstacle);
  
}
}

function spawnfood() {

  
       //food banana
       if (frameCount % 180 === 0) {
       banana = createSprite(600,300,40,10);
       banana.addImage(bananaImage)
       banana.y = Math.round(random(50,360))
       banana.scale = 0.16;
       banana.velocityX = -3;
       //assigning lifetime to the variable
       banana.lifetime =200;
       FoodGroup.add(banana);   
}
}