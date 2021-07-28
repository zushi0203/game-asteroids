import {background} from "../../components/Background/Background.js";
import {
  getPlayer,
  initPlayer,
  isPlayerActive,
  isPlayerBlink,
  isPlayerExploding,
  updatePlayer
} from "../../components/Player/Player.js";
import {Enemy} from "../../components/Enemy/Enemy.js";
import {playerExplode} from "../../components/Player/functions/playerExplode";
import {checkCollision} from "../../utils";
import {devidedNewEnemies} from "./functions/devidedNewEnemies";

/**
 *
 * @param gameState
 */
export const sceneGame = (gameState) => {
  background();
  updatePlayer();
  gameState.enemies.forEach((enemy) => {
    enemy.update();
  })

  if(isPlayerExploding()) return;

  const player = getPlayer();

  gameState.enemies.forEach((enemy, enemyIndex) => {
    const isPlayerCollision = checkCollision(player.x, player.y, enemy.param.x, enemy.param.y) < player.r + enemy.param.r;

    if(isPlayerCollision && !isPlayerBlink()) {
      playerExplode(player);
      console.log("before: ", gameState.enemies)
      gameState.enemies = devidedNewEnemies(gameState.level, gameState.enemies, enemyIndex);
      console.log("after: ", gameState.enemies)
    }

    player.lasers.forEach((laser) => {
      const isLaserCollision = checkCollision(laser.param.x, laser.param.y, enemy.param.x, enemy.param.y) < laser.param.r + enemy.param.r;
     
      if(!isLaserCollision) return;
      console.log(isLaserCollision);

      console.log("before: ", gameState.enemies)
      laser.explode();
      gameState.enemies = devidedNewEnemies(gameState.level, gameState.enemies, enemyIndex);
      console.log("after: ", gameState.enemies)
      
    });
  });
}