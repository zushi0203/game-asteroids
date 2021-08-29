import {background} from "../../components/Background/Background";
import {Enemy} from "../../components/Enemy/Enemy";
import {GameManager} from "../../core/GameManager";

/**
 * ゲーム画面のステージアップを行うシーン関数です
 * @param gameManager
 */
export const sceneGameStageUp = (gameManager: GameManager) => {
  background();

  const {player} = gameManager.gameState;

  gameManager.levelUp();

  const {enemies, level} = gameManager.gameState;


  [...Array(level)].map((_) => {
		const enemy = new Enemy(level, player.position.getData, false);
		enemies.push(enemy);
	})

  // 扱い方が決まってから追加
	// consts trackingEnemy = new TrackingEnemy(game.gameState.level, player);
	// game.gameState.enemies.push(trackingEnemy);
}