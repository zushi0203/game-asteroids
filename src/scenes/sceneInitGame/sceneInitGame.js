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
	game.initState();
	const player = getPlayer();

	[...Array(game.gameState.level * 3)].map((_) => {
		const enemy = new Enemy(game.gameState.level, player);
		game.gameState.enemies.push(enemy);
	})

	const trackingEnemy = new TrackingEnemy(game.gameState.level, player);
	game.gameState.enemies.push(trackingEnemy);

	background();
}