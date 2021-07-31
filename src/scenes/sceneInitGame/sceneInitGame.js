import {background} from "../../components/Background/Background.js";
import {initPlayer, getPlayer} from "../../components/Player/Player.js";
import {Enemy} from "../../components/Enemy/Enemy.js";
import {TrackingEnemy} from "../../components/TrackingEnemy/TrackingEnemy.js";

/**
 *
 * @param gameState
 */
export const sceneInitGame = (gameState) => {
	initPlayer();
	const player = getPlayer();

	[...Array(gameState.level * 3)].map((_) => {
		const enemy = new Enemy(gameState.level, player);
		gameState.enemies.push(enemy);
	})

	const trackingEnemy = new TrackingEnemy(gameState.level, player);
	gameState.enemies.push(trackingEnemy);

	background();
}