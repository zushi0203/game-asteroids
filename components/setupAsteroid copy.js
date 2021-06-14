import {handleEdgeOfScreen, distBetweenPoints} from "../utils/index.js"; 
import * as ENV from "../common/env.js";
import {param} from "../common/parameters.js";
import {levelUp} from "./game/game.js";

export class Asteenemy {
  constructor() { // data
    this.enemies = [];
  }

  updateEnemies() {
    const _enemies = [];
    [...Array(ENV.ENEMIES_NUM + param.level)].forEach(() => {
      // do {
      //   const x = Math.floor(Math.random() * ENV.canvas.width);
      //   const y = Math.floor(Math.random() * ENV.canvas.height);
      // } while (
      //   distBetweenPoints(param.player.x, param.player.y, x, y) < ENV.ENEMIES_SIZE * 2 + param.player.r
      // );
      _enemies.push(newAsteenemy(x, y, Math.ceil(ENV.ENEMIES_SIZE / 2) ));
    });
  
    this.enemies = _enemies;
  }

  destroyHitAsteenemy() {
    const x = param.enemies[index].x;
    const y = param.enemies[index].y;
    const r = param.enemies[index].r;
  
    // destroy the parent enemy
    param.enemies.splice(index, 1);
  
    // if(isExplode) return;
  
    // split the enemy in two it necessary
    if(r == Math.ceil(ENV.ENEMIES_SIZE / 2)) {
      param.enemies.push(newAsteenemy(x, y, Math.ceil(ENV.ENEMIES_SIZE / 4)));
      param.enemies.push(newAsteenemy(x, y, Math.ceil(ENV.ENEMIES_SIZE / 4)));
    } else if (r == Math.ceil(ENV.ENEMIES_SIZE / 4)) {
      param.enemies.push(newAsteenemy(x, y, Math.ceil(ENV.ENEMIES_SIZE / 8)));
      param.enemies.push(newAsteenemy(x, y, Math.ceil(ENV.ENEMIES_SIZE / 8)));
    }
  
    // new level when no more enemy
    if(param.enemies.length == 0) {
      param.level++;
      levelUp();
    }
  }

  drawEnemies() {
    ENV.ctx.lineWidth = ENV.SHIP_SIZE / 20;
    enemies.forEach(enemy => {
      // draw a path
      ENV.ctx.strokeStyle = "lightslategray";
      ENV.ctx.beginPath();
      ENV.ctx.moveTo(
        // enemy.x + enemy.r * Math.cos(enemy.a), 
        // enemy.y + enemy.r * Math.sin(enemy.a)
        enemy.x + enemy.r * enemy.offs[0] * Math.cos(enemy.a), 
        enemy.y + enemy.r * enemy.offs[0] * Math.sin(enemy.a)
      );
  
      // draw the polygon
      [...Array(enemy.vert)].map((_, index) => {
        ENV.ctx.lineTo(
          enemy.x + enemy.r * enemy.offs[index] * Math.cos(enemy.a + index * Math.PI * 2 / enemy.vert),
          enemy.y + enemy.r * enemy.offs[index] * Math.sin(enemy.a + index * Math.PI * 2 / enemy.vert)
        );
      });
      ENV.ctx.closePath();
      ENV.ctx.stroke();
  
      if(ENV.SHOW_BOUNDING) {
        ENV.ctx.strokeStyle = "lime";
        ENV.ctx.beginPath();
        ENV.ctx.arc(enemy.x, enemy.y, enemy.r, 0, Math.PI * 2);
        ENV.ctx.stroke();
      }
  
      // move the enemy
      enemy.x += enemy.xv;
      enemy.y += enemy.yv;
  
      // handle edge of screen
      handleEdgeOfScreen(enemy);
    });
  }
}

/**
 * 
 * @param {*} x 
 * @param {*} y 
 * @param {*} r 
 * @returns 
 */
const newAsteenemy = (x, y, r) => {
  const lvlMult = 1 + 0.1 * param.level;
  const _enemy = {
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
  [...Array(_enemy.vert)].map(el => {
    _enemy.offs.push(Math.random() * ENV.ENEMIES_JAG * 2 + 1 - ENV.ENEMIES_JAG);
  });

  return _enemy;
}

/**
 * 
 * @returns 
 */
export const createAsteenemyBelt = () => {
  const _enemies = [];
  let x;
  let y

  [...Array(ENV.ENEMIES_NUM + param.level)].forEach(() => {
    // do {
    //   x = Math.floor(Math.random() * ENV.canvas.width);
    //   y = Math.floor(Math.random() * ENV.canvas.height);
    // } while (
    //   distBetweenPoints(param.player.x, param.player.y, x, y) < ENV.ENEMIES_SIZE * 2 + param.player.r
    // );
    _enemies.push(newAsteenemy(x, y, Math.ceil(ENV.ENEMIES_SIZE / 2) ));
  });

  return _enemies;
}

/**
 * 
 * @param {*} index 
 * @param {*} isExplode 
 */
export const destroyAsteenemy = (index, isExplode) => {
  const x = param.enemies[index].x;
  const y = param.enemies[index].y;
  const r = param.enemies[index].r;

  // destroy the parent enemy
  param.enemies.splice(index, 1);

  // if(isExplode) return;

  // split the enemy in two it necessary
  if(r == Math.ceil(ENV.ENEMIES_SIZE / 2)) {
    param.enemies.push(newAsteenemy(x, y, Math.ceil(ENV.ENEMIES_SIZE / 4)));
    param.enemies.push(newAsteenemy(x, y, Math.ceil(ENV.ENEMIES_SIZE / 4)));
  } else if (r == Math.ceil(ENV.ENEMIES_SIZE / 4)) {
    param.enemies.push(newAsteenemy(x, y, Math.ceil(ENV.ENEMIES_SIZE / 8)));
    param.enemies.push(newAsteenemy(x, y, Math.ceil(ENV.ENEMIES_SIZE / 8)));
  }

  // new level when no more enemy
  if(param.enemies.length == 0) {
    param.level++;
    levelUp();
  }
}

/**
 * 
 * @param {*} enemies 
 */
export const drawAsteenemy = (enemies) => {
  ENV.ctx.lineWidth = ENV.SHIP_SIZE / 20;
  enemies.forEach(enemy => {
    // draw a path
    ENV.ctx.strokeStyle = "lightslategray";
    ENV.ctx.beginPath();
    ENV.ctx.moveTo(
      // enemy.x + enemy.r * Math.cos(enemy.a), 
      // enemy.y + enemy.r * Math.sin(enemy.a)
      enemy.x + enemy.r * enemy.offs[0] * Math.cos(enemy.a), 
      enemy.y + enemy.r * enemy.offs[0] * Math.sin(enemy.a)
    );

    // draw the polygon
    [...Array(enemy.vert)].map((_, index) => {
      ENV.ctx.lineTo(
        enemy.x + enemy.r * enemy.offs[index] * Math.cos(enemy.a + index * Math.PI * 2 / enemy.vert),
        enemy.y + enemy.r * enemy.offs[index] * Math.sin(enemy.a + index * Math.PI * 2 / enemy.vert)
      );
    });
    ENV.ctx.closePath();
    ENV.ctx.stroke();

    if(ENV.SHOW_BOUNDING) {
      ENV.ctx.strokeStyle = "lime";
      ENV.ctx.beginPath();
      ENV.ctx.arc(enemy.x, enemy.y, enemy.r, 0, Math.PI * 2);
      ENV.ctx.stroke();
    }

    // move the enemy
    enemy.x += enemy.xv;
    enemy.y += enemy.yv;

    // handle edge of screen
    handleEdgeOfScreen(enemy);
  });
}

/**
 * 
 */
export const playerExplode = () => {
  param.player.explodeTime = Math.ceil(ENV.SHIP_EXPLODE_DUR * ENV.FPS);
}