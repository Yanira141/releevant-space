/**
 * Variables used during the game.
 */
let player;
let enemy = [];
let cursors;
let background;
let background2;
let spaceBar;
let bullet=[];
let contBullet = 0;
let frame =-1;
let enemies = [];
let explosion;
let pausa = false;
let sonidoFondo = true;
let score = 0 ;



/**
 * It prelaods all the assets required in the game.
 */
function preload() {
  this.load.image("sky", "assets/backgrounds/blue.png");
  this.load.image("player", "assets/characters/player.png");
  this.load.image("enemy", "assets/characters/alien1.png");
  this.load.image("red", "assets/particles/red.png");
  this.load.audio("sonidoExplosion", "assets/sonidos/explosion.mp3");
  this.load.audio("sonidoDisparo", "assets/sonidos/disparos.mp3");
  this.load.audio("sonidoFondo", " assets/sonidos/fondo.mp3");
  this.load.image("gameover" , "assets/backgrounds/gameover.png");
  this.load.audio("sonidogameover", "assets/sonidos/sonidogameover.mp3")
}

/**
 * It creates the scene and place the game objects.
 */
function create() {
  // scene background
  background=this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, "sky");
  background2=this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2- background.height , "sky");

  // playet setup
  player = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT, "player");
  player.setX((SCREEN_WIDTH - player.width * PLAYER_SCALE) / 2);
  player.setY(SCREEN_HEIGHT - (player.height * PLAYER_SCALE) / 2);
  player.setScale(PLAYER_SCALE);

  // enemy setup
  enemy = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT, "enemy");
  enemy.setX((SCREEN_WIDTH - enemy.width * ENEMY_SCALE) / 2);
  enemy.setY((enemy.height * ENEMY_SCALE) / 2);
  enemy.setScale(ENEMY_SCALE);

  gameover = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, "gameover")
  gameover.setX(SCREEN_WIDTH + gameover.width)
  gameover.setY(SCREEN_HEIGHT + gameover.height)
  sonidogameover = this.sound.add("sonidogameover")
  //cursors map into game engine
  cursors = this.input.keyboard.createCursorKeys();

  //map space key status
  spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  
  sonidoExplosion = this.sound.add("sonidoExplosion")
  sonidoDisparo = this.sound.add("sonidoDisparo")
  sonidoFondo = this.sound.add("sonidoFondo")
  sonidoFondo.loop= true;
  sonidoFondo.play()

  explosion = this.add.particles("red").createEmitter({
    scale: { min: 0.5, max: 0 },
    speed: { min: -100, max: 100 },
    quantity: 10,
    frequency: 0.1,
    lifespan: 200,
    gravityY: 0,
    on: false,})



    scoreText = this.add.text(5, 5, "Score:" + score, {
      font: "32px Arial",
      fontSize: "32px",
      fill: "#FFFFFF",
    });

//funcion para crear enemigos

    // spawnEnemy(this)
}

/**
 * Updates each game object of the scene.
 */
function update() {

  
  if(pausa){
    return
  }
  this.add.ellipse(player.x,player.y-player.height/2*PLAYER_SCALE,180,200)
  moverFondo()
  moverPlayer()
 if(frame<0){
  disparar(this)}
  if(contBullet>0){
    moverBala()
  }
frame--;
console.log(bullet.length);
moverEnemy()


}
 



function moverFondo(){
 
    background.setY(background.y + BACKGROUND_VELOCITY)
    background2.setY(background2.y + BACKGROUND_VELOCITY)

    if(background.y > background.height + SCREEN_HEIGHT / 2){
      background.setY(background2.y - background.height)

      let temporal = background;
      background = background2;
      background2 = temporal;
    }
 

  }


function moverPlayer(){
  if (cursors.left.isDown) {
    let x = player.x - PLAYER_VELOCITY
      if(x < (player.width /2) * PLAYER_SCALE){
        x= (player.width / 2) * PLAYER_SCALE;
      }
      player.setX(x)
  }
  if (cursors.right.isDown) {
    let x = player.x + PLAYER_VELOCITY
      if(x >SCREEN_WIDTH- (player.width /2) * PLAYER_SCALE){
      x =SCREEN_WIDTH-(player.width /2)* PLAYER_SCALE;
    }
    player.setX(x)
  }
  if (cursors.up.isDown) {
    let y = player.y - PLAYER_VELOCITY
      if(y < (player.height /2) * PLAYER_SCALE){
        y = (player.height / 2)* PLAYER_SCALE;
      }
      player.setY(y)
  }
  if (cursors.down.isDown) {
    let y = player.y + PLAYER_VELOCITY
    if(y > SCREEN_HEIGHT - (player.height/2) * PLAYER_SCALE){
      y= SCREEN_HEIGHT-(player.height/2)* PLAYER_SCALE;
    }
    player.setY(y)
  }
}


function disparar(engine){
  if(spaceBar.isDown){
    bullet.push(engine.add.ellipse(player.x, player.y-player.height / 2 * PLAYER_SCALE, -5, 5, 0xf5400a))
    contBullet++;
    frame = 5 ;
    sonidoDisparo.play()
  }

}


function moverBala(){
  let index = -1;
for(let i = 0; i< bullet.length; i++){
  bullet[i].setY(bullet[i].y-BULLET_VELOCITY)

  
    if(bullet[i].y<(0-bullet[i].height)){
      
    bullet[i].destroy()
    index=i;
    }
    colision(bullet[i])
  }
  if(index >= 0 ){
    bullet.splice(index,1)
  }
}
          



function colision(bala){
  if((bala.x >= enemy.x-(enemy.width*ENEMY_SCALE)/2 &&
     bala.x <= enemy.x+(enemy.width*ENEMY_SCALE)/2)&&
    (bala.y >= enemy.y-(enemy.height*ENEMY_SCALE)/2 &&
     bala.y <= enemy.y+(enemy.height*ENEMY_SCALE)/2)
  ){
 
    explosion.setPosition(enemy.x, enemy.y);
      explosion.explode();
      sonidoExplosion.play()
     enemy.setY((enemy.height*ENEMY_SCALE)/2)
     score += 1
     scoreText.setText("Score:" + score);
    enemy.setX(Math.floor(Math.random()*(SCREEN_WIDTH-enemy.width) + (enemy.width/2)));
    bala.destroy()
   
  }
  
}


function moverEnemy(){
  enemy.setY(enemy.y+ENEMY_VELOCITY)
   
  if (
    (player.x >= enemy.x - (enemy.width * ENEMY_SCALE) / 2 &&
      player.x <= enemy.x + (enemy.width * ENEMY_SCALE) / 2 &&
      player.y >= enemy.y - (enemy.height * ENEMY_SCALE) / 2 &&
      player.y <= enemy.y + (enemy.height * ENEMY_SCALE) / 2) ||
    enemy.y >= SCREEN_HEIGHT

  ){enemy.destroy()
  player.destroy()
    explosion.setPosition(enemy.x,enemy.y);
    explosion.explode;
    gameover.setX(SCREEN_WIDTH / 2)
    gameover.setY(SCREEN_WIDTH / 2)
    sonidoFondo.stop()
    pausa= true;
    sonidogameover.play()
    document.getElementsByClassName("vuelve")[0].style.display="flex";
    document.getElementsByClassName("pause")[0].style.display="none";
    document.getElementsByClassName("play")[0].style.display="none";
    document.getElementsByClassName("reinicia")[0].style.display="none";
}
}



function pause(){
 pausa = true ;

}

function play(){
pausa = false;

}

