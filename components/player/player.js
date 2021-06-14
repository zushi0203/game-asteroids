import * as ENV from "../../common/env.js";
import {handleEdgeOfScreen, checkCollision} from "../../utils/index.js"; 
import {drawPlayer, drawExplosionPlayer} from "./playerDraw.js"; 
import {updatePlayerLaser, shootLaser} from "./playerShoot.js";
import {playerExplode, setExplodeTime} from "./playerExplode.js";
import {enemyExplode} from "../enemy/enemyExplode.js";
import { levelUp } from "../game/game.js";

let player;
export const getPlayer = () => player; // 現在のplayerを取得します

// ================================================
//
// validate
//
// ================================================

export const isPlayerBlink = () => player.blinkNum > 0;
export const isPlayerExploding = () => player.explodeTime > 0;
const isPlayerDead = () => player.dead;
const checkEnemiesCollision = (enemies) => {
  if(isPlayerBlink() || isPlayerExploding()) return;

  enemies.forEach((enemy, enemyIndex) => {
    const isCollision = checkCollision(player.x, player.y, enemy.x, enemy.y) < player.r + enemy.r;
    if(isCollision) {
      console.log("collision")
      playerExplode(player);
      enemyExplode(enemies, enemyIndex);
    }
  });
}



// ================================================
//
// set param functions
//
// ================================================

const setPlayerPosition = () => {
  // rotate param.player
  player.a += player.rotate;

  // move the param.player
  player.x += player.thrust.x;
  player.y += player.thrust.y;
}
const setPlayerThrust = () => {
  // thrust the player
  if (player.thrusting && !player.dead) {
    player.thrust.x += ENV.SHIP_THRUST * Math.cos(player.a) / ENV.FPS;
    player.thrust.y -= ENV.SHIP_THRUST * Math.sin(player.a) / ENV.FPS;
  } else { // not thrusting gensoku
    player.thrust.x -= ENV.FRICTION * player.thrust.x / ENV.FPS;
    player.thrust.y -= ENV.FRICTION * player.thrust.y / ENV.FPS;
  }
}
const setBlink = () => {
  if(!isPlayerBlink()) return;
  // reduce the blink time
  player.blinkTime--;

  // reduce the blink num
  if(player.blinkTime == 0) {
    player.blinkTime = Math.ceil(ENV.SHIP_BLINK_DUR * ENV.FPS);
    player.blinkNum--;
  }
}

// thrusting
const enablePlayerThrusting = () => {
  player.thrusting = true;
}
const disablePlayerThrusting = () => {
  player.thrusting = false;
}

// rotate
const enablePlayerRotate = (multipliedValue) => {
  let rotateValue = ENV.SHIP_TURN_SPD / 180 * Math.PI / ENV.FPS;
  if(multipliedValue) rotateValue *= multipliedValue; 
  player.rotate = rotateValue;
}
const disablePlayerRotate = () => {
  player.rotate = 0;
}

// can shoot
const enableCanShoot = () => {
  player.canShoot = true;
}
const disableCanShoot = () => {
  player.canShoot = false;
}

// dead
export const setPlayerDead = () => { 
  player.dead = true 
};



// ================================================
//
// player functions
//
// ================================================

export const newPlayer = () => {
  return {
    x: ENV.canvas.width / 2, // center
    y: ENV.canvas.height / 2, // center
    r: ENV.SHIP_SIZE / 2,
    a: 90 / 180 * Math.PI, // convert to radians
    blinkNum: Math.ceil(ENV.SHIP_INV_DUR / ENV.SHIP_BLINK_DUR),
    blinkTime: Math.ceil(ENV.SHIP_BLINK_DUR * ENV.FPS),
    canShoot: true,
    explodeTime: 0,
    dead: false,
    lives: ENV.GAME_LIVES,
    lasers: [],
    rotate: 0,
    thrusting: false,
    thrust: {
      x: 0,
      y: 0,
    }
  }
}
export const initPlayer = () => {
  player = newPlayer();
}

export const continuePlayer = (lives) => {
  let continuePlayer = newPlayer();
  continuePlayer.lives = lives;
  player = continuePlayer;
}

// ================================================
//
// update function
//
// ================================================

export const updatePlayer = (enemies) => {
  const isContinue = player.lives > 0;

  if(!isContinue) setPlayerDead();
  if(player.dead) return;

  // const isPlayerExploding = player.explodeTime > 0;
  const isPlayerBlinkOn = player.blinkNum % 2 === 0;

  // set position
  if(!isPlayerExploding()) {
    setPlayerThrust();
    setPlayerPosition();
  }
  
  // draw player
  if(isPlayerExploding()) {
    drawExplosionPlayer(player);
    setExplodeTime(player);
  } 
  else if(!isPlayerBlinkOn) {
    setBlink();
  } 
  else {
    drawPlayer(player, 20);
    setBlink();
  }


  //
  handleEdgeOfScreen(player);

  // update laser
  updatePlayerLaser(player);

  if(enemies.length == 0) {
    // levelUp();
  } else {
    checkEnemiesCollision(enemies);
  }
}



// ================================================
//
// event handle
//
// ================================================

/**
 * 
 * @param {*} ev 
 * @returns 
 */
export const playerHandleKeyDown = (/** @type {KeyboardEvent} */ ev) => {
  if(isPlayerDead()) return;

  switch(ev.code) {
    case "KeyX": 
      playerExplode(player);
      break;
    case "Space": // space bar (allow shooting again)
      shootLaser(player);
      disableCanShoot();
      break;
    case "ArrowLeft": // left arrow (rotate param.player left)
      enablePlayerRotate();
      break;
    case "ArrowUp": // up arrow (param.player thrusting)
      enablePlayerThrusting();
      break;
    case "ArrowRight": // right arrow (rotate param.player right)
      enablePlayerRotate(-1);
      break;
  }
};

/**
 * 
 * @param {*} ev 
 * @returns 
 */
export const playerHandleKeyup = (/** @type {KeyboardEvent} */ ev) => {
  if(isPlayerDead()) return;
  
  switch(ev.code) {
    case "Space": // space bar (allow shooting again)
      // param.player.canShoot = true;
      enableCanShoot();
      break;
    case "ArrowLeft": // left arrow (rotate param.player left)
      disablePlayerRotate();
      break;
    case "ArrowUp": // up arrow (param.player thrusting)
      disablePlayerThrusting();
      break;
    case "ArrowRight": // right arrow (rotate param.player right)
      disablePlayerRotate();
      break;
  }
}