import * as ENV from "../../common/env.js"; 
import { setEnemies, newEnemy } from "./enemy.js";

const devideEnemy = (enemy) => {
  const isBigEnemy = enemy.r == Math.ceil(ENV.ENEMIES_SIZE / 2);
  const iSmallEnemy = enemy.r == Math.ceil(ENV.ENEMIES_SIZE / 4);
  let enemies = [];
  if(isBigEnemy) {
    enemies.push(newEnemy(enemy.x, enemy.y, Math.ceil(ENV.ENEMIES_SIZE / 4)));
    enemies.push(newEnemy(enemy.x, enemy.y, Math.ceil(ENV.ENEMIES_SIZE / 4)));
  }
  if(iSmallEnemy) {
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
  let newEmemies = [];
  const devideEnemies = devideEnemy(enemies[index]);
  const currentEnemies = [...enemies];

  currentEnemies.splice(0, 1);
  newEmemies = currentEnemies.concat(devideEnemies);

  setEnemies(devideEnemies);
}