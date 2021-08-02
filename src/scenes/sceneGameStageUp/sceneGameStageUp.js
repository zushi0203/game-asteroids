import {background} from "../../components/Background/Background.js";
import {Enemy} from "../../components/Enemy/Enemy.js";
import { getPlayer } from "../../components/Player/Player.js";

/**
 *
 * @param gameState
 */
export const sceneGameStageUp = (game) => {
  background();

  game.levelUp();

  const player = getPlayer();

  [...Array(game.gameState.level)].map((_) => {
		const enemy = new Enemy(game.gameState.level, player);
		game.gameState.enemies.push(enemy);
	})

  // 扱い方が決まってから追加
	// const trackingEnemy = new TrackingEnemy(game.gameState.level, player);
	// game.gameState.enemies.push(trackingEnemy);

}