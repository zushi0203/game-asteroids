import * as ENV from "../../common/env.js";
import {handleEdgeOfScreen} from "../../utils/index.js"; 
import {drawPlayerLaser} from "./playerDraw.js"; 

// shoot
export const updatePlayerLaser = (player) => {
  drawPlayerLaser(player);
  updateLasersPosition(player);
}

/**
 * 
 * @param {*} player 
 */
export const playerLaserLoop = (player) => {
  // loop over the lasers
  player.lasers.forEach((laser, laserIndex) => {
    // grab the laser properties
    lx = laser.x;
    ly = laser.y;

    // detect hits
    if(laser.explodeTime !== 0) return;
    if(distBetweenPoints(ax, ay, lx, ly) < ar) {
      // destroy the enemy and activate the laser explosion
      // destroyAsteenemy(enemyIndex);
      laser.explodeTime = Math.ceil(ENV.LASER_EXPLODE_DUR * ENV.FPS);
    }
  })
};

/**
 * 
 */
const newLaser = (player) => {
  return {
    x: player.x + 4 / 3 * player.r * Math.cos(player.a),
    y: player.y - 4 / 3 * player.r * Math.sin(player.a),
    xv: ENV.LASER_SPD * Math.cos(player.a) / ENV.FPS,
    yv: -ENV.LASER_SPD * Math.sin(player.a) / ENV.FPS,
    r: 0,
    dist: 0,
    explodeTime: 0,
  }
}

/**
 * 
 * @param {*} player 
 */
export const shootLaser = (player) => {
  // create the laser object
  if(player.canShoot && player.lasers.length < ENV.LASER_MAX) {
    const laser = newLaser(player);
    player.lasers.push(laser);
  }
  // prevent further shooting
  player.canShoot = false;
}

/**
 * 
 * @param {*} player 
 */
export const updateLasersPosition = (player) => {
  if(!player.lasers.length) return;
  console.log("shoot!");
  // move the lasers
  [...player.lasers].forEach((laser, index) => {
    // 先頭のレーザーが最大距離に到達したら削除
    const isLaserOverDistance = laser.dist > ENV.LASER_DIST * ENV.canvas.width;
    if(isLaserOverDistance) {
      player.lasers.splice(index, 1);
      return;
    }

    // handle the explosion
    const isLaserExploding = laser.explodeTime > 0;
    if(isLaserExploding) {
      laser.explodeTime--;

      // destroy the laser after the duration is up
      if(laser.explodeTime == 0) {
         player.lasers.splice(index, 1);
      }
    } else {
      // move the laser
      laser.x += laser.xv;
      laser.y += laser.yv;
    }

    // calculate the distance trabelled
    laser.dist += Math.sqrt(Math.pow(laser.xv, 2) + Math.pow(laser.yv, 2));

    // handle edge of screen
    handleEdgeOfScreen(laser);
  });
}