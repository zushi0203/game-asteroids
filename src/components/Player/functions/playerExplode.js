import * as ENV from "../../../env.js";
import { continuePlayer } from "../Player.js";

export const playerExplode = (player) => {
  if(!player) return;
  player.explodeTime = Math.ceil(ENV.SHIP_EXPLODE_DUR * ENV.FPS);
}

export const setExplodeTime = (player) => {
  player.explodeTime--;
  
  const isExploding = player.explodeTime > 0
  if(isExploding) return;

  const continuePlayerLives = player.lives - 1;

  continuePlayer(continuePlayerLives);
}