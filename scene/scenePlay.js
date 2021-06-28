import {setBackground} from "../components/background/background.js";
import {initPlayer, isPlayerActive, updatePlayer} from "../components/player/player.js";
import {Enemy} from "../components/enemy/Enemy.js";

/**
 *
 * @param gameState
 */
export const scenePlay = (gameState) => {
  if(!isPlayerActive()) {
    initPlayer();
  }
  if(!gameState.enemies.length) {
    [...Array(gameState.level)].map((_) => {
      const enemy = new Enemy(gameState.level);
      gameState.enemies.push(enemy);
    })
  }

  setBackground();
  updatePlayer(gameState.enemies);
  gameState.enemies.forEach((enemy) => {
    enemy.update();
  })
}