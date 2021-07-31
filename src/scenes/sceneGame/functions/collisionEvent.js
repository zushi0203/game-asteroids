import {checkCollision} from "../../../utils";
import {isPlayerBlink, playerExplode} from "../../../components/Player/Player";
import { devidedNewEnemies } from "./devidedNewEnemies";

/**
 * 
 * @param {*} level 
 * @param {*} enemies 
 * @param {*} collisionIndex 
 * @returns 
 */
const updatedEnemies = (level, enemies, collisionIndex) => {
  if(enemies[collisionIndex].param.name === "enemy") {
    return devidedNewEnemies(level, enemies, collisionIndex);
  } else {
    // 現在のenemies配列から、対象のEnemyを削除
    const _enemies = [...enemies];
    _enemies.splice(collisionIndex, 1);
    return [..._enemies];
  }
}

/**
 * 
 * @param {*} player 
 * @param {*} enemies 
 * @returns 
 */
export const collisionEvent = (player, enemies, level) => {
  let newEnemies;

  enemies.forEach((enemy, enemyIndex) => {
    //
    const isPlayerCollision = checkCollision(player.x, player.y, enemy.param.x, enemy.param.y) < player.r + enemy.param.r;
    if(isPlayerCollision && !isPlayerBlink()) {
      playerExplode(player);
      return updatedEnemies(level, enemies, enemyIndex);
    }
  
    //
    player.lasers.forEach((laser) => {
      const isLaserCollision = checkCollision(laser.param.x, laser.param.y, enemy.param.x, enemy.param.y) < laser.param.r + enemy.param.r;
     
      if(!isLaserCollision) return;
      laser.explode();
      return updatedEnemies(level, enemies, enemyIndex);
    });
  });
} 