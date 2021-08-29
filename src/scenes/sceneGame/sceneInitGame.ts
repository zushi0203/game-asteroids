import {background} from "../../components/Background/Background";

import {Enemy} from "../../components/Enemy/Enemy";
import {TrackingEnemy} from "../../components/TrackingEnemy/TrackingEnemy";
import {GameManager} from "../../core/GameManager";

/**
 * ゲーム画面の初期化を行うシーン関数です
 * @param gameManager
 */
export const sceneInitGame = (gameManager: GameManager) => {
	const {player, enemies, level} = gameManager.gameState;

	// プレイヤーの初期化
	player.removeAction();
	player.init();
	player.addAction();

	// レベルに応じてエネミー配列を初期化
	[...Array(level)].map((_) => {
		const enemy = new Enemy(level, player.position.getData, false);
		enemies.push(enemy);
	})

	// gameState.enemiesにpushせず、お邪魔キャラとして扱うのがよさそう
	const trackingEnemy = new TrackingEnemy(level, player.position.getData, false);
	enemies.push(trackingEnemy);

	background();
}