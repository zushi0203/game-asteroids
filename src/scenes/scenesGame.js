import {background} from "../components/Background/Background.js";
import {
  getPlayer,
  initPlayer,
  isPlayerActive,
  isPlayerBlink,
  isPlayerExploding,
  updatePlayer
} from "../components/Player/Player.js";
import {Enemy} from "../components/Enemy/Enemy.js";
import {playerExplode} from "../components/Player/PlayerExplode";
import {checkCollision} from "../utils";
import {explodedEnemies} from "../components/Enemy/ExplodedEnemies";

/**
 *
 * @param gameState
 */
export const scenesGame = (gameState) => {
  if(!isPlayerActive()) {
    initPlayer();
  }
  if(!gameState.enemies.length) {
    [...Array(gameState.level)].map((_) => {
      const enemy = new Enemy(gameState.level);
      gameState.enemies.push(enemy);
    })
  }

  background();
  updatePlayer(gameState.enemies);
  gameState.enemies.forEach((enemy) => {
    enemy.update();
  })

  if(isPlayerBlink() || isPlayerExploding()) return;
  const player = getPlayer();
  gameState.enemies.forEach((enemy, enemyIndex) => {
    const isCollision = checkCollision(player.x, player.y, enemy.param.x, enemy.param.y) < player.r + enemy.param.r;

    if(isCollision) {
      playerExplode(player);
      gameState.enemies = explodedEnemies(gameState.level, gameState.enemies, enemyIndex);
    }
  });
}