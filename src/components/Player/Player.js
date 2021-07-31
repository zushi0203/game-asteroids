import * as ENV from "../../env.js";
import {
  handleEdgeOfScreen,
  calcTwoPointRadian
} from "../../utils";
import {drawPlayer, drawExplosionPlayer} from "./functions/playerDraw.js";
import {Laser} from "../Laser/Laser.js";

const initPlayerParam = {
  x: ENV.canvas.width / 2, // center
  y: ENV.canvas.height / 2, // center
  r: ENV.SHIP_SIZE / 2,
  a: 90 / 180 * Math.PI, // convert to radians
  targetPosition: {
    x: null,
    y: null,
  },
  blinkNum: Math.ceil(ENV.SHIP_INV_DUR / ENV.SHIP_BLINK_DUR),
  blinkTime: Math.ceil(ENV.SHIP_BLINK_DUR * ENV.FPS),
  canShoot: true,
  shootTime: 0,
  explodeTime: 0,
  dead: false,
  lasers: [],
  rotate: 0,
  thrusting: false,
  thrust: {
    x: 0,
    y: 0,
  }
}

let player = {...initPlayerParam};
export const getPlayer = () => player; // 現在のplayerを取得します

// ================================================
//
// validate
//
// ================================================

export const isPlayerActive = () => Object.keys(player).length;
export const isPlayerBlink = () => player.blinkNum > 0;
export const isPlayerExploding = () => player.explodeTime > 0;
export const isPlayerDead = () => player.dead;


// ================================================
//
// set param functions
//
// ================================================

const setPlayerTargetPosition = (targetPosition) => {
  player.targetPosition = targetPosition;
}
const setPlayerPosition = () => {
  // rotate param.Player
  player.a += player.rotate;

  // move the param.Player
  player.x += player.thrust.x;
  player.y += player.thrust.y;
}

const setPlayerThrust = (thrust) => {
  player.thrust.x = thrust.x;
  player.thrust.y = thrust.y;
}

const addPlayerThrust = (thrust) => {
  player.thrust.x += thrust.x;
  player.thrust.y += thrust.y;
}

const onPlayerThrusting = () => {
  // thrust the Player
  let thrust = {
    x: null,
    y: null,
  };

  if (player.thrusting && !player.dead) {
    thrust.x = player.thrust.x += ENV.SHIP_THRUST * Math.cos(player.a) / ENV.FPS;
    thrust.y = player.thrust.y -= ENV.SHIP_THRUST * Math.sin(player.a) / ENV.FPS;
  } else { // not thrusting gensoku
    // thrust.x = player.thrust.x -= ENV.FRICTION * player.thrust.x / ENV.FPS;
    // thrust.y = player.thrust.y -= ENV.FRICTION * player.thrust.y / ENV.FPS;
    thrust.x = player.thrust.x -= ENV.FRICTION * player.thrust.x / ENV.FPS;
    thrust.y = player.thrust.y -= ENV.FRICTION * player.thrust.y / ENV.FPS;
  }

  setPlayerThrust(thrust);
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

const setPlayerAngle = (radian) => {
  player.a = radian;
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

// can Laser
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

const onExplode = (player) => {
  player.explodeTime--;
  
  const isExploding = player.explodeTime > 0
  if(isExploding) return;
  initPlayer();
}

export const playerExplode = (player) => {
  if(!player) return;
  player.explodeTime = Math.ceil(ENV.SHIP_EXPLODE_DUR * ENV.FPS);
}

// ================================================
//
// Player functions
//
// ================================================

export const initPlayer = () => {
  player = {...initPlayerParam};
}

export const shootLaser = () => {
  // create the Laser object
  if(player.canShoot && player.lasers.length < ENV.LASER_MAX) {
    const laser = new Laser(player);
    player.lasers.push(laser);
  }
  // prevent further shooting
  player.canShoot = false;
  console.log("shoot", player.lasers);
}

export const autoShootLaser = () => {
  if(0 < player.shootTime) {
    player.shootTime--;
    return;
  }

  if(player.lasers.length < ENV.LASER_MAX) {
    const laser = new Laser(player);
    player.lasers.push(laser);
    player.shootTime = Math.ceil(ENV.SHIP_SHOOT_DUR * ENV.FPS);
  }
}



// ================================================
//
// update function
//
// ================================================

export const updatePlayer = () => {
  // const isPlayerExploding = Player.explodeTime > 0;
  const isPlayerBlinkOn = player.blinkNum % 2 === 0;

  // set position
  if(!isPlayerExploding()) {
    onPlayerThrusting();
    setPlayerPosition();
  }
  
  // draw Player
  if(isPlayerExploding()) {
    drawExplosionPlayer(player);
    onExplode(player);
  } 
  else if(!isPlayerBlinkOn) {
    setBlink();
  } 
  else {
    drawPlayer(player, 20);
    setBlink();
  }

  if(!isPlayerBlink()) autoShootLaser();
 

  //
  handleEdgeOfScreen(player);

  // update Laser
  player.lasers.forEach((laser, index) => {
    if(laser.isDead()) {
      player.lasers.splice(index, 1);
    } else {
      laser.update(player)
    }
  });
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
  if(!isPlayerActive()) return;
  if(isPlayerDead()) return;

  switch(ev.code) {
    case "KeyX": // debug explode
      playerExplode(player);
      break;
    case "Space": // space bar (allow shooting again)
      shootLaser();
      disableCanShoot();
      break;
    case "ArrowLeft": // left arrow (rotate param.Player left)
      enablePlayerRotate();
      break;
    case "ArrowUp": // up arrow (param.Player thrusting)
      enablePlayerThrusting();
      break;
    case "ArrowRight": // right arrow (rotate param.Player right)
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
      // param.Player.canShoot = true;
      enableCanShoot();
      break;
    case "ArrowLeft": // left arrow (rotate param.Player left)
      disablePlayerRotate();
      break;
    case "ArrowUp": // up arrow (param.Player thrusting)
      disablePlayerThrusting();
      break;
    case "ArrowRight": // right arrow (rotate param.Player right)
      disablePlayerRotate();
      break;
  }
}

export const playerHandleClick = (/** @type {KeyboardEvent} */ ev) => {
  if (isPlayerDead()) return;
  console.log("playerHandle: click");

  // クリックした座標をplayer.targetPositionに設定
  const clickPosition = {
    x: ev.layerX,
    y: ev.layerY
  }
  setPlayerTargetPosition(clickPosition);

  //　クリックした方向にangleを向ける
  const twoPointRadian = calcTwoPointRadian(player.x, player.y, player.targetPosition.x, player.targetPosition.y);
  setPlayerAngle(twoPointRadian);
  console.log("playerHandleClick: player", player)

  // 現在とクリックした座標の距離をもとに、player.thrustを設定
  // const twoPointDistance = calcTwoPointDistance(player.x, player.targetPosition.x, player.y, player.targetPosition.y);
  // console.log("twoPointDistance: ", twoPointDistance)
  // const t = twoPointDistance / 2;
  const [dx, dy] = [player.targetPosition.x - player.x, player.targetPosition.y - player.y];
  const vx = dx / ENV.FPS;
  const vy = dy / ENV.FPS;
  const thrust = {
    x: vx,
    y: vy,
  }
  addPlayerThrust(thrust);
}