
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
//Adding the bodies ,the engine and the world to the computer's memory
var engine,world;
var sceneImg;
var sceneImg2;
var sceneImg3;
var scene;

var apple;
var button,buttonImg;
var ground;
var sling;

var playerJunko1Img;
var junko,junkoImg;
var cloudImg,cloud;
var gameState = 0;

var winningSound;
var losingSound;

var stopWatch=500;

var sadImg;

var sling;
var cyclist,cyclistImage;

//var reset,resetImg;

//Creating arrays for the donut, hotdog and pizza

var donut=[];
var hotDog=[];
var pizza=[];

function preload(){

  //Loading all the images

    sceneImg = loadImage("images/scene.png");
    buttonImg=loadImage("images/playButton.png");
    sceneImg2 = loadImage("images/bg.jpg");
    
    junkoImg = loadImage("images/junko1.png");
    cloudImg = loadImage("images/cloud.png");

    playerJunko1Img = loadImage("images/girlSling.png");

    winningSound = loadSound("sounds/winning.mp3");
    losingSound = loadSound("sounds/losing.mp3");

    sceneImg3=loadImage("images/track.jpg");

    sadImg = loadImage("images/sadGirl.png");

    losingImg = loadImage("images/losingMessage.jpg");

    cyclistImage = loadImage("images/cyclist1.png");
}

function setup(){
   createCanvas(windowWidth,windowHeight);
   engine = Engine.create();
   world = engine.world;

  //Creating all the the sprites and adding their images
   
   apple = new Apple(width-480,height/2+82,60,60);

   sling = new SlingShot(apple.body,{x:width-480,y:height/2+82});

   scene = createSprite(width/2,height/2);
   scene.addImage(sceneImg);

   button = createSprite(width-200,height-100);
   button.addImage(buttonImg);

   junko = createSprite(200,height-200);
   junko.addImage(junkoImg);

   cloud = createSprite(450,height/2-100);
   cloud.addImage(cloudImg);

   ground = new Ground(width/2-200,height-30,width*3,10);

   cyclist = createSprite(300,height/2);
   cyclist.addImage(cyclistImage);
   cyclist.visible = false;
   

}

function draw(){
 
  
  if(gameState===0){

    

    drawSprites();

   
 //Displaying all the texts.
  
    textSize(16);
    textFont("Georgia");
    fill("black");
    text("Hello my name is Junko.",350,height/2-150);
    text("I am on a mission to climb Mt Everest.",320,height/2-120);
    text("Help me complete my mission.Press ",320,height/2-90);
    text("the Play button to start ",360,height/2-60);
    text(" the game ",390,height/2-30);
    textSize(40);
    textFont("Georgia");
    textStyle("Bold");
    fill("#e60000");
    text("Junko's journey to the Summit",620,height/2-260);

//Creating an if statement to chamge the gameState to 1 when we press the button play

if(mousePressedOver(button)){
     gameState=1;
    
   }
  
  }
else if(gameState===1){

//updating the engine

     Engine.update(engine);

//adding the second background when gameState is 1

     background(sceneImg2);
    
//Adding image for Junko in level 1 challenge 1

      image(playerJunko1Img,width-500,height/2,200,200);

//displaying the sling

      sling.display();

//displaying the sling      

     apple.display();

    ground.display();
  
    

// adding an if statement thatif frameCount is 60% switch between donut , pizza and hotdog.
   if(frameCount%60===0){
        var rand = Math.round(random(1,4));
        switch(rand){
          case 1: donut.push(new Donut(random(100,width-800),0,100));
          break;
          case 2: pizza.push(new Pizza(random(100,width-800),0,100));
          break;
          case 3: hotDog.push(new HotDog(random(100,width-800),0,100));
          break;
          default: break;
        }
      }

   stopWatch=stopWatch-1;
   fill("black");
   textSize(20);
   text("TimeLeft:"+stopWatch,width/2,height/2);

   if(stopWatch===0){
     gameState=2;
   } 

//creating for loop to display the donut
        
    
for(var k=0;k<donut.length;k++){
  donut[k].display();
  if (detectHit(donut[k],apple)) {
    World.remove(world,donut[k]);
    donut.splice(k,1);
  }
}
for(var k=0;k<donut.length;k++){
  if(donut[k].body.position.y>=height-160){
    gameState=5;
    //losingSound.play();
    
   }

  
}

//creating for loop to display the pizza

for(var k=0;k<pizza.length;k++){
 pizza[k].display();
 if (detectHit(pizza[k],apple)) {
  World.remove(world,pizza[k]);
  pizza.splice(k,1);
}
}
for(var k=0;k<pizza.length;k++){
  if(pizza[k].body.position.y>=height-160){
    gameState=5;
    //losingSound.play();
    
  }

  
}


//creating for loop to display the hotDog

for(var k=0;k<hotDog.length;k++){
  hotDog[k].display();
  if (detectHit(hotDog[k],apple)) {
    World.remove(world,hotDog[k]);
    hotDog.splice(k,1);
  }
}

  for(var k=0;k<hotDog.length;k++){

    if(hotDog[k].body.position.y>=height-160){
      gameState=5;
      //losingSound.play();
      
    }

   
  }
  
  }
  

   else if(gameState===2){
     scene.destroy();
      button.destroy();
      cloud.destroy();
      junko.destroy();
      background(sceneImg3);
      cyclist.visible = true;
      drawSprites();
  }


  else if(gameState===5){
    background(sceneImg2);
    imageMode(CENTER);
    image(sadImg,width/2,height/2,200,200);
    image(losingImg,width/2+200,height/2-150,200,200);
    /*
    fill("black");
    textSize(30);
    text("Press 'Spacebar' to restart",width/2-150,height/2+200);  
*/
    //if(keyCode===32){
      //gameState = 1;
    
 // }
  }
//  }

  
}

//Giving a function that if spaceBar if pressed then the apple will be attached to the slingshot
function keyPressed(){
  if(gameState===1){
    if(keyCode===32){
      Matter.Body.setPosition(apple.body,{x:width-480,y:height/2+82});
      sling.attach(apple.body);
    }
  } 
  
    
}
//Giving a function that if mouse is draggeed then apple should move with the mouse
function mouseDragged(){
  if(gameState===1){
     Matter.Body.setPosition(apple.body, {x: mouseX , y: mouseY});
  }
}
//Giving a unction that if mouse is released then the sling should fly
function mouseReleased(){
  if(gameState===1){
     sling.fly();
  }
}

function detectHit(lapple,lfood){
	appleBodyPosition=lapple.body.position
	foodBodyPosition=lfood.body.position
	var distance=dist(foodBodyPosition.x,foodBodyPosition.y,appleBodyPosition.x,appleBodyPosition.y)
	if(distance<=lapple.body.circleRadius+lfood.body.circleRadius){
    return true;
  } else{
    return false;
  }
    
}
 
