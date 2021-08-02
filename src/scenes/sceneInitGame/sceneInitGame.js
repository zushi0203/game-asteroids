import {background} from "../../components/Background/Background.js";
import {initPlayer, getPlayer} from "../../components/Player/Player.js";
import {Enemy} from "../../components/Enemy/Enemy.js";
import {TrackingEnemy} from "../../components/TrackingEnemy/TrackingEnemy.js";

/**
 *
 * @param gameState
 */
export const sceneInitGame = (game) => {
	initPlayer();
	const player = getPlayer();

	[...Array(game.gameState.level)].map((_) => {
		const enemy = new Enemy(game.gameState.level, player);
		game.gameState.enemies.push(enemy);
	})

	// gameState.enemiesにpushせず、お邪魔キャラとして扱うのがよさそう
	const trackingEnemy = new TrackingEnemy(game.gameState.level, player);
	game.gameState.enemies.push(trackingEnemy);

	background();
}