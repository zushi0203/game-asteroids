import {checkCollision} from "../../../common/utils/functions/checkCollision";
import { devidedNewEnemies } from "./devidedNewEnemies";
import {GameManager} from "../../../core/GameManager";
import {EnemiesType} from "../../../common/types/EnemiesType";

/**
 * 敵配列の更新を行います
 * @param {*} level 
 * @param {*} enemies 
 * @param {*} collisionIndex
 */
const updatedEnemies = (level: number, enemies: EnemiesType, collisionIndex: number) => {
  if(enemies[collisionIndex].enemyType === "enemy") {
    // 衝突した敵のタイプが"enemy"の場合、分裂処理を行った敵配列を返す
    return devidedNewEnemies(level, enemies, collisionIndex);
  } else {
    // 現在のenemies配列から、対象のEnemyを削除した配列を返す
    const _enemies = [...enemies];
    _enemies.splice(collisionIndex, 1);
    return [..._enemies];
  }
}

/**
 * ゲームのステータスをもとに衝突判定を行う関数です
 * @param gameManager
 */
export const collision = (gameManager: GameManager) => {
  const {player, enemies, level} = gameManager.gameState;

  if(!player || player.isBlink()) return;
  // if(!enemies.length) return;

  const playerPosition = player.position.getData;
  //
  enemies.forEach((enemy, enemyIndex) => {
    const enemyPosition = enemy.position.getData;
    const isPlayerCollision = checkCollision(playerPosition.x, playerPosition.y, playerPosition.r, enemyPosition.x, enemyPosition.y, enemyPosition.r);
    if(isPlayerCollision && !player.isBlink() && !player.isExploding()) {
      console.log(isPlayerCollision);
      // いずれかの敵に衝突したプレイヤーの処理
      if(!gameManager.debugMethod().isGod()) {
        player.die();
        gameManager.reduceLives();
      };

      // 衝突後の敵配列の処理
      const newEnemies = updatedEnemies(level, enemies, enemyIndex);
      gameManager.updateEnemies(newEnemies);
    }

    // ゲームオーバーの場合、早期return
    if(gameManager.isGameover()) return;
  
    // プレイヤーのレーザー
    player.laser.lasers.forEach((laser) => {
      const laserPosition = laser.position.getData;
      const isLaserCollision = checkCollision(laserPosition.x, laserPosition.y, laserPosition.r, enemyPosition.x, enemyPosition.y, enemyPosition.r);
     
      if(!isLaserCollision) return;
      // 衝突したレーザーの処理
      laser.die();

      // レーザーに衝突した敵配列の処理
      const newEnemies = updatedEnemies(level, enemies, enemyIndex);
      gameManager.updateEnemies(newEnemies);
    });
  });
} 