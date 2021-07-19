import * as ENV from "../../../env.js";
import {Enemy} from "../../../components/Enemy/Enemy";

/**
 * 敵を分裂させます
 * @param enemy
 * @returns {*[]}
 */
const devideEnemy = (level, enemy) => {
  const isBigEnemy = enemy.param.r == Math.ceil(ENV.ENEMIES_SIZE / 2);
  const iSmallEnemy = enemy.param.r == Math.ceil(ENV.ENEMIES_SIZE / 4);
  let enemies = [];

  console.log(enemy);

  if(isBigEnemy) {
    console.log("isBigEnemy")
    enemies.push(new Enemy(level, false, {
      posX: enemy.param.x,
      posY: enemy.param.y,
      size: Math.ceil(ENV.ENEMIES_SIZE / 4),
    }));
    enemies.push(new Enemy(level, false, {
      posX: enemy.param.x,
      posY: enemy.param.y,
      size: Math.ceil(ENV.ENEMIES_SIZE / 4),
    }));
  }
  else if(iSmallEnemy) {
    console.log("small")
    enemies.push(new Enemy(level, false, {
      posX: enemy.param.x,
      posY: enemy.param.y,
      size: Math.ceil(ENV.ENEMIES_SIZE / 8),
    }));
    enemies.push(new Enemy(level, false, {
      posX: enemy.param.x,
      posY: enemy.param.y,
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
export const devidedNewEnemies = (level, enemies, index) => {
  // 対象のEnemyを分裂させる
  const devidedEnemy = devideEnemy(level, enemies[index]);
  // 現在のEnemies配列から、対象のEnemyを削除
  const currentEnemies = [...enemies];
  currentEnemies.splice(index, 1);
  // 対象を削除したEnemiesと分裂したEnemyを結合
  const newEmemies = currentEnemies.concat(devidedEnemy);

  return newEmemies;
}