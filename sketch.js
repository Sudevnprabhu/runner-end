var Play=1;
var End=2;
var Won=0;
var gamestate=Play;

var score=0;
var coins=0;

var coin,coinimg;
var coinGroup;
var ground,bg;
var player,playimg;
var lefttrainGroup;
var borderl,borderr;
var trainleft,train;
var done = [50, 150, 250]
var rb,restart;
var finish,finishimg,finGroup;
var pl,ply;
var lose,win;



function preload(){
  ground1=loadImage("Three_rail_tracks_350.jpg");
  rb=loadImage("rb.png");
  coinimg=loadImage("coin.png");
  train=loadImage("train.jpg");
  playimg=loadImage("police.jpeg");
  finishimg=loadImage("finish.png");
  pl=loadImage("p.jpg");
  lose=loadSound("lose.mp3");
  win=loadSound("win.mp3");
}



function setup() {
  createCanvas(300,500);

  player=createSprite(150,450,100,100);
  player.shapeColor=color("red");
  player.addImage(playimg);
  playimg.resize(width/3,height/3)
  
 
  lefttrainGroup=new Group();
  coinGroup=new Group();
  
  ply=createSprite(150,250,50,50);
  ply.addImage(pl);
  pl.resize(width/3,height/5);

  ply.visible=false;

  restart=createSprite(150,250);
  restart.addImage(rb);
  rb.resize(width/2,height/5)

  restart.visible=false;
}


function draw() {
  background(ground1); 

  if(gamestate===Play){
  
    score = score +1
    fill("yellow")
    textSize(25)
    text("Score: "+ score , 150,50)

    fill("yellow");
    textSize(25)
    text("Coins: "+ coins , 150,70)
    
  
    if(coinGroup.collide(player)){
      coin.visible=false;
      coins = coins +10
    }

    if (keyWentDown(LEFT_ARROW)){
      player.x=player.x - 100;
    }
  
    if (keyWentDown(RIGHT_ARROW)){
      player.x=player.x + 100;
    }

  spawncoins();
  spawnLtrain();
 

 if(score===1000){
  finish=createSprite(150,0,300,50);
  finish.addImage(finishimg);
  finish.velocityY=5 ;
 }

 
 if(lefttrainGroup.collide(player)){
  lose.play(); 
  gamestate=End;
 }

 if(score===1100){
   win.play();
   gamestate=Won;
 }
 }


 if(gamestate=== End){
  restart.visible=true;
    fill("yellow");
    textSize(35);
    text("Game Over",70,120);
    text("Score:"+score,80,150)
    text("Coins:"+coins,80,190)
  trainleft.velocityY=0
  coin.velocityY=0

  lefttrainGroup.setLifetimeEach(-1);
  coinGroup.setLifetimeEach(-1);
}


if (gamestate===Won){
  ply.visible=true;
  fill("yellow");
  textSize(33);
  text("You Won The Game",5,120);
  text("Score:"+score,80,150)
  text("Coins:"+coins,80,190)
  trainleft.velocityY=0
  coin.velocityY=0
  
  lefttrainGroup.setLifetimeEach(-1);
  coinGroup.setLifetimeEach(-1);
}

if(mousePressedOver(restart)){
  reset();
}

if(mousePressedOver(ply)){
  playagain();
}

  drawSprites();
}


function spawnLtrain(){
  if(frameCount % 50 === 0){
    trainleft=createSprite(50,50,100,100);
    trainleft.addImage(train);
    trainleft.x=random(done);
    trainleft.shapeColor=color("black");
    trainleft.velocityY=15;

    trainleft.lifetime=34;

   lefttrainGroup.add(trainleft);
  }
}

function spawncoins(){
    if(frameCount % 20 === 0){
      coin=createSprite(50,50,20,20);
      coin.addImage(coinimg);
      coinimg.resize(width/10,height/10)
      coin.x=random(done);
      coin.shapeColor=color("yellow");
      coin.velocityY=5;
  
      coin.visible=true
      coin.lifetime=100;
  
     coinGroup.add(coin);
    }
}

function reset(){
   gamestate = Play;
   restart.visible=false;
   lefttrainGroup.destroyEach();
   coinGroup.destroyEach();
   score=0;
   coins=0;
}

function playagain(){
  gamestate = Play;
  ply.visible=false;
  lefttrainGroup.destroyEach();
  coinGroup.destroyEach();
  score=0;
  coins=0;
}





