import {setBackground} from "../components/background/background.js";
import {initPlayer, getPlayer} from "../components/player/player.js";
import {Enemy} from "../components/enemy/Enemy.js";

/**
 *
 * @param gameState
 */
export const sceneInitPlay = (gameState) => {
	initPlayer();

	[...Array(gameState.level)].map((_) => {
		const enemy = new Enemy(gameState.level);
		gameState.enemies.push(enemy);
	})

	setBackground();
}