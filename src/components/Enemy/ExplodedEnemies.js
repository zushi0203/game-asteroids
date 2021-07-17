import * as ENV from "../../env.js";
import {Enemy} from "./Enemy";

/**
 * 敵を分裂させます
 * @param enemy
 * @returns {*[]}
 */
const devideEnemy = (level, enemy) => {
  const isBigEnemy = enemy.r == Math.ceil(ENV.ENEMIES_SIZE / 2);
  const iSmallEnemy = enemy.r == Math.ceil(ENV.ENEMIES_SIZE / 4);
  let enemies = [];

  console.log("isBigEnemy");
  enemies.push(new Enemy(level, "false", {
    posX: enemy.x,
    posY: enemy.y,
    size: Math.ceil(ENV.ENEMIES_SIZE / 4),
  }));
  if(isBigEnemy) {
    enemies.push(new Enemy(level, "false", {
      posX: enemy.x,
      posY: enemy.y,
      size: Math.ceil(ENV.ENEMIES_SIZE / 4),
    }));
    enemies.push(new Enemy(level, false, {
      posX: enemy.x,
      posY: enemy.y,
      size: Math.ceil(ENV.ENEMIES_SIZE / 4),
    }));
  }
  else if(iSmallEnemy) {
    enemies.push(new Enemy(level, false, {
      posX: enemy.x,
      posY: enemy.y,
      size: Math.ceil(ENV.ENEMIES_SIZE / 8),
    }));
    enemies.push(new Enemy(level, false, {
      posX: enemy.x,
      posY: enemy.y,
      size: Math.ceil(ENV.ENEMIES_SIZE / 8),
    }));
  }

  return enemies;
}


/**
 * 
 * @param {*} index 
 * @param {*} isExplode 
 */
export const explodedEnemies = (level, enemies, index) => {
  // 対象のEnemyを分裂させる
  const devidedEnemy = devideEnemy(level, enemies[index]);
  // 現在のEnemies配列から、対象のEnemyを削除
  const currentEnemies = [...enemies];
  currentEnemies.splice(index, 1);
  // 対象を削除したEnemiesと分裂したEnemyを結合
  const newEmemies = currentEnemies.concat(devidedEnemy);

  return newEmemies;
}