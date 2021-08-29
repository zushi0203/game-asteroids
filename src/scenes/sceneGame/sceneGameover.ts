import { background } from "../../components/Background/Background";
import {GameManager} from "../../core/GameManager";

/**
 * ゲーム画面のゲームオーバーを行うシーン関数です
 * @param gameManager
 */
export const sceneGameover = (gameManager: GameManager) => {
	background();

	const {player, enemies} = gameManager.gameState;

	// enemiesの更新
	enemies.forEach((enemy) => {
		enemy.update(player.position.getData);
	})
}
