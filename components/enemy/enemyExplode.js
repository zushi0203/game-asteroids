import * as ENV from "../../env.js";
import { setEnemies, newEnemy } from "./_enemy.js";

/**
 * 敵を分裂させます
 * @param enemy
 * @returns {*[]}
 */
const devideEnemy = (enemy) => {
  const isBigEnemy = enemy.r == Math.ceil(ENV.ENEMIES_SIZE / 2);
  const iSmallEnemy = enemy.r == Math.ceil(ENV.ENEMIES_SIZE / 4);
  let enemies = [];

  if(isBigEnemy) {
    enemies.push(newEnemy(enemy.x, enemy.y, Math.ceil(ENV.ENEMIES_SIZE / 4)));
    enemies.push(newEnemy(enemy.x, enemy.y, Math.ceil(ENV.ENEMIES_SIZE / 4)));
  }
  else if(iSmallEnemy) {
    enemies.push(newEnemy(enemy.x, enemy.y, Math.ceil(ENV.ENEMIES_SIZE / 8)));
    enemies.push(newEnemy(enemy.x, enemy.y, Math.ceil(ENV.ENEMIES_SIZE / 8)));
  }

  return enemies;
}


/**
 * 
 * @param {*} index 
 * @param {*} isExplode 
 */
export const enemyExplode = (enemies, index) => {
  // 対象のEnemyを分裂させる
  const devidedEnemy = devideEnemy(enemies[index]);
  // 現在のEnemies配列から、対象のEnemyを削除
  const currentEnemies = [...enemies];
  currentEnemies.splice(index, 1);
  // 対象を削除したEnemiesと分裂したEnemyを結合
  const newEmemies = currentEnemies.concat(devidedEnemy);

  console.log(newEmemies);

  setEnemies(newEmemies);
}