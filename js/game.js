/**
 * Variables used during the game.
 */
let player;
let enemy;
let cursors;
let background;
let background2;

/**
 * It prelaods all the assets required in the game.
 */
function preload() {
  this.load.image("sky", "assets/backgrounds/blue.png");
  this.load.image("player", "assets/characters/player.png");
  this.load.image("enemy", "assets/characters/alien1.png");
}

/**
 * It creates the scene and place the game objects.
 */
function create() {
  // scene background
  background=this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, "sky");
  background2=this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2-1024, "sky");

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

  //cursors map into game engine
  cursors = this.input.keyboard.createCursorKeys();
}

/**
 * Updates each game object of the scene.
 */
function update() {
  moverFondo()
  moverPlayer()
  moverEnemigo()
}
 




function moverEnemigo(){
  let x = enemy.x + PLAYER_VELOCITY
      x >SCREEN_HEIGHT- (enemy.height /2) * ENEMY_SCALE
      x =SCREEN_HEIGHT-(enemy.height /2)* ENEMY_SCALE;
    
    enemy.setX(x)
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



