var bg, bg1;
var mario, mario_running,mario_standing,mariosn;
var daisy, daisyimg,winsp,winim, wonsn;
var mush, mush1,mushgroup;
var pl,pli;
var ingnd1,gosn;
var score = 0,lives = 3, scoresn,dis=0;
var enemy, en1,en2,en3,enemygroup,rand;
var START = 1, PLAY = 2, OVER = 3, WON = 4;
var gameState = START;
var gos,goi;
var rss,rsi;


function preload(){
  bg = loadImage("background.jpg");
  mario_running = loadAnimation("mo1.png","mo2.png","mo3.png","mo4.png");
  mario_standing = loadAnimation("mo1.png");
  mariosn = loadSound("SuperMarioBros.mp3");
  mush1 = loadImage("Mushroom.png");
  scoresn = loadSound("score.mp3");
  en1 = loadImage("enemy1.png");
  en2 = loadImage("enemy2.png");
  en3 = loadImage("enemy3.png");
  gosn = loadSound("GameOver.mp3");
  goi = loadImage("gm.png");
  rsi = loadImage("restart.png");
  pli = loadImage("pl1.png");
  daisyimg = loadImage("daisy2.png");
  winim = loadImage("won4.gif");
  wonsn = loadSound("areaclear.mp3");
  
}

function setup() {
  createCanvas(600,600);
  
  bg1 = createSprite(300,300);
  bg1.addImage("background",bg);
  
  mario = createSprite(50,465,10,10);
  mario.addAnimation("standing",mario_standing);
  mario.addAnimation("running",mario_running);
  mario.scale = 0.75;
  
  
  mushgroup = new Group();
  
  enemygroup = new Group();
  
  ingnd = createSprite(300,500,600,10);
  ingnd.visible = false;
  
  gos = createSprite(300,250);
  gos.addImage(goi);
  gos.visible = false;
  
  rss = createSprite(300,300);
  rss.addImage(rsi);
  rss.scale = 0.2;
  rss.visible = false;
  
  pl = createSprite(300,400);
  pl.addImage(pli);
  pl.scale = 0.5;
  pl.visible = false;
  
  daisy = createSprite(500,440);
  daisy.addImage(daisyimg);
  daisy.visible = false;
  
  winsp = createSprite(300,250);
  winsp.addImage(winim);
  winsp.visible = false;
  
}

function draw() {
  if(gameState === START){
    mario.visible = true;
    pl.visible = true;
    gos.visible = false;
    rss.visible = false;
    daisy.visible = false;
    
    lives = 3;
    score = 0;
    dis = 0;
    
  if(mousePressedOver(pl)){
    gameState = PLAY;
    }
  }
  
  if(gameState === PLAY){
    pl.visible = false;
    if(mariosn.isPlaying() == false){
      mariosn.loop();
    }
    mario.visible = true;
    mario.changeAnimation("running",mario_running);
    
    bg1.velocityX = -2;
    ingnd.velocityX = -2;
    
    dis = dis + Math.round(getFrameRate()/60);
    
    if(bg1.x < 200){
    bg1.x = 300;
    }

  
    if(ingnd.x < 150){
    ingnd.x = 300;
      }
  
    if(keyDown("space") && mario.y > 300){
    mario.velocityY = -8;
      }
    mario.velocityY = mario.velocityY + 0.8;
    mario.collide(ingnd);
  
    if(mushgroup.isTouching(mario)){
      mario.scale = 1;
      scoresn.play();
      mushgroup[0].destroy();
      score = score + 1;
      
      }
    
      spawnmush();
      spawnenemy(); 
  
      if(enemygroup.isTouching(mario)){
      scoresn.play();
      mario.changeAnimation("standing",mario_standing);
      mario.scale = 0.75;
      mario.visble = false;   
      lives = lives -1;
      enemygroup[0].destroy();
      mario.tint = 126;
      setTimeout(function blink(){
        mario.tint = 255;
      }, 750)
      
      }  
    
    
    if(lives <= 0 ){     
        mariosn.stop();
        gosn.play();
        gameState = OVER;  
      }
    
    if(dis >= 1000){
      daisy.visible = true;
      daisy.velocityX = -2;
      
      if(daisy.isTouching(mario)){
       mariosn.stop();
       wonsn.play(); 
       gameState = WON; 
      }
          
    }
    
  }
  
  if(gameState === OVER){
    ingnd.velocityX = 0;
    mario.velocityY = 0;
    bg1.velocityX = 0;
    
     enemygroup.destroyEach();
     mushgroup.destroyEach();  
    
    gos.visible = true;
    rss.visible = true;
    pl.visible = false;
    
    

    if(mousePressedOver(rss)){
      gameState = START;
    }
  }
  
  if(gameState === WON){
    mario.changeAnimation("standing",mario_standing);
    winsp.visible = true;
    ingnd.velocityX = 0;
    mario.velocityY = 0;
    bg1.velocityX = 0;
    daisy.velocityX = 0;
    
     enemygroup.destroyEach();
     mushgroup.destroyEach(); 
    
  }  
  
    drawSprites();
    textSize(15);
    textStyle(BOLD);
    text("no of lives: "+lives,25,30);
    text("score: "+score,25,50); 
    text("distance travelled: "+dis+"m",25,70);
    text("press space to jump",250,50);
    
 
}
function spawnmush(){
  if(frameCount%150 === 0 && dis < 1000){
    mush = createSprite(500,200);
    mush.addImage(mush1);
    mush.scale = 0.1;
    mush.y = Math.round(random(200,375));
    
    mush.velocityX = -2;
    mush.lifetime = width/2;
    mushgroup.add(mush);
    
  }
}
function spawnenemy(){
  if(frameCount%300 === 0 && dis < 1000){
    enemy = createSprite(500,465);
    rand = Math.round(random(1,3));
    switch(rand) {
      case 1: enemy.addImage(en1);
              enemy.scale = 0.2;
              enemy.velocityX = -4;
              break;
      case 2: enemy.addImage(en2);
              enemy.scale = 0.2;
              enemy.velocityX = -3;
              break;
      case 3: enemy.addImage(en3);
              enemy.scale = 0.2;
              enemy.velocityX = -2;
              break;
      default: break;
    }
    
    
    enemy.lifetime = 300;
    if(mushgroup.isTouching(enemy)){  
      enemy.destroy();
    }
    enemygroup.add(enemy);
  }
  
}
