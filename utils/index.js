import * as ENV from "../common/env.js";

/**
 * 
 * @param {*} x1 
 * @param {*} y1 
 * @param {*} x2 
 * @param {*} y2 
 * @returns 
 */
export const distBetweenPoints = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * 
 * @param {*} x1 
 * @param {*} y1 
 * @param {*} x2 
 * @param {*} y2 
 * @returns 
 */
 export const checkCollision = (targetX, targetY, nextTargetX, nextTargetY) => {
  return Math.sqrt(Math.pow(nextTargetX - targetX, 2) + Math.pow(nextTargetY - targetY, 2));
}

/**
 * 
 * @param {*} item 
 */
export const handleEdgeOfScreen = (item) => {
  if (item.x < 0 - item.r) {
    item.x = ENV.canvas.width + item.r;
  } else if (item.x > ENV.canvas.width + item.r) {
    item.x = 0 - item.r;
  }
  if (item.y < 0 - item.r) {
    item.y = ENV.canvas.height + item.r;
  } else if(item.y > ENV.canvas.height + item.r) {
    item.y = 0 - item.r;
  }
}
