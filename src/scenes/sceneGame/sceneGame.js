import {background} from "../../components/Background/Background.js";
import {
  getPlayer,
  isPlayerBlink,
  isPlayerExploding,
  updatePlayer
} from "../../components/Player/Player.js";
import { collisionEvent } from "./functions/collisionEvent.js";

/**
 *
 * @param gameState
 */
export const sceneGame = (gameState) => {
  background();

  // playerの更新
  updatePlayer();
  const player = getPlayer();

  // enemiesの更新
  gameState.enemies.forEach((enemy) => {
    enemy.update(player);
  })

  // 衝突処理・スコアの更新
  if(isPlayerExploding()) return;
  collisionEvent(player, gameState.enemies, gameState.level);

  // ゲームのステータス更新
}