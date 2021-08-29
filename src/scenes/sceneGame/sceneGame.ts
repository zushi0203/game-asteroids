import {background} from "../../components/Background/Background";
import { collision } from "./functions/collision";
import {GameManager} from "../../core/GameManager";

/**
 * ゲーム画面の更新を行うシーン関数です
 * @param gameManager
 * @param gameOverScene
 * @param stageUpScene
 */
export const sceneGame = (gameManager: GameManager, gameOverScene: string, stageUpScene: string) => {
  background();

  const {player, enemies} = gameManager.gameState;

  // playerの更新
  player.update();

  // enemiesの更新
  enemies.forEach((enemy) => {
    enemy.update(player.position.getData);
  })

  // ゲームオーバーの判定（プレイヤーが爆発中の確認も行う）
  if(gameManager.isGameover() && !player.isExploding()) {
    gameManager.sceneManager.use(gameOverScene);
    return;
  }

  // 衝突処理・スコアの更新
  // if(isExploding()) return;
  collision(gameManager);

  // ステージクリアの判定
  if(gameManager.isStageClear()) {
    gameManager.sceneManager.use(stageUpScene);
  }

}