import * as ENV from "../../common/env.js";
import {initPlayer, getPlayer} from "../player/player.js";
import {initEnemy} from "../enemy/enemy.js";

let level = 0

/**
 * 
 */
export const newGame = () => {
  initPlayer();
  initEnemy(getPlayer());
}

export const getLevel = () => {
  return level;
}

/**
 * 
 */
export const levelUp = () => {
  level ++;
  levelTextAlpha = 1.0;
  // setup the enemy
  initEnemy(getPlayer());
}

/**
 * 
 */
// export const gameOver = () => {
// }

/**
 * 
 * @param {*} text 
 * @param {*} textAlpha 
 */
const drawText = (text, textAlpha) => {
  ENV.ctx.textAlign = "center";
  ENV.ctx.textBaseline = "middle";
  ENV.ctx.fillStyle = "rgba(255, 255, 255, " + textAlpha + ")";
  ENV.ctx.font = "small-caps " + ENV.TEXT_SIZE + "px sans";
  ENV.ctx.fillText(text, ENV.canvas.width / 2, ENV.canvas.height * 0.75);
}

/**
 * 
 */
export const pushLevelMessage = (drawText(`LEVEL ${level}`, 1.0));

/**
 * 
 */
export const pushGameMessage = (drawText("GAME OVER"));