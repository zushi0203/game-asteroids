import {background} from "../../components/Background/Background.js";
import {
  getPlayer,
  isPlayerBlink,
  isPlayerExploding,
  updatePlayer
} from "../../components/Player/Player.js";
import { collision } from "./functions/collision";

/**
 *
 * @param game
 */
export const sceneGame = (game) => {
  background();

  // playerの更新
  updatePlayer();
  const player = getPlayer();

  // enemiesの更新
  game.gameState.enemies.forEach((enemy) => {
    enemy.update(player);
  })

  // 衝突処理・スコアの更新
  if(isPlayerExploding()) return;
  collision(player, game);

  // ゲームのステータス更新
}