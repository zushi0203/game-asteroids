import {handleEdgeOfScreen, distBetweenPoints, checkCollision} from "../../utils/index.js"; 
import * as ENV from "../../common/env.js";
import {getLevel} from "../game/game.js";
import {drawEnemies} from "./enemyDraw.js";
import {enemyExplode} from "./enemyExplode.js";
import {isPlayerBlink, isPlayerExploding} from "../player/player.js";

// state
let enemies = [];
export const getEnemies = () => enemies;

// ================================================
//
// validate
//
// ================================================
// const checkPlayerCollision = (player) => {
//   if(isPlayerBlink() || isPlayerExploding());
//   enemies.forEach((enemy, enemyIndex) => {
//     const isCollision = checkCollision(player.x, player.y, enemy.x, enemy.y) < player.r + enemy.r;
//     if(isCollision) {
//       console.log(isCollision);
//       enemyExplode(enemies, enemyIndex);
//     }
//   });
// }


// ================================================
//
// set param functions
//
// ================================================

const setEnemiesPosition = (enemies) => {
  // move the enemy
  // handle edge of screen
  enemies.forEach((enemy) => {
    enemy.x += enemy.xv;
    enemy.y += enemy.yv;
    handleEdgeOfScreen(enemy)
  });
}

export const setEnemies = (enemiesBelt) => {
  enemies = enemiesBelt;
}



// ================================================
//
// enemy functions
//
// ================================================

export const newEnemy = (x, y, r) => {
  const level = getLevel();
  const lvlMult = 1 + 0.1 * level;
  const enemy = {
    x: x,
    y: y,
    xv: Math.random() * ENV.ENEMIES_SPD * lvlMult / ENV.FPS * (Math.random() < 0.5 ? 1 : -1),
    yv: Math.random() * ENV.ENEMIES_SPD * lvlMult / ENV.FPS * (Math.random() < 0.5 ? 1 : -1),
    r: r,
    a: Math.random() * Math.PI * 2, // in radians
    vert: Math.floor(Math.random() * (ENV.ENEMIES_VERT + 1) + ENV.ENEMIES_VERT / 2),
    offs: [],
  };
  // create the vertex offsets array
  [...Array(enemy.vert)].map(el => {
    enemy.offs.push(Math.random() * ENV.ENEMIES_JAG * 2 + 1 - ENV.ENEMIES_JAG);
  });

  return enemy;
}

/**
 * 
 * @returns 
 */
export const initEnemy = (player) => {
  let x;
  let y;
  let enemiesBelt = [];

  const level = getLevel();

  [...Array(ENV.ENEMIES_NUM + level)].forEach(() => {
    x = Math.floor(Math.random() * ENV.canvas.width);
    y = Math.floor(Math.random() * ENV.canvas.height);
    do {
      x = Math.floor(Math.random() * ENV.canvas.width);
      y = Math.floor(Math.random() * ENV.canvas.height);
    } while (
      distBetweenPoints(player.x, player.y, x, y) < ENV.ENEMIES_SIZE * 2 + player.r
    );
    enemiesBelt.push(newEnemy(x, y, Math.ceil(ENV.ENEMIES_SIZE / 2) ));
  });

  setEnemies(enemiesBelt);

  checkCollision(player);
}



// ================================================
//
// update function
//
// ================================================

export const updateEnemy = (player) => {
  drawEnemies(enemies);
  setEnemiesPosition(enemies);

  // if(enemies.length !== 0) {
  //   checkPlayerCollision(player);
  // }
}