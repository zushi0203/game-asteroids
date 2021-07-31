import * as ENV from "../env.js";

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

/**
 * 2点間の距離を求めます。
 * @param x
 * @param y
 * @param x2
 * @param y2
 * @returns {number}
 */
export const calcTwoPointDistance = (x, y, x2, y2) => {
  return Math.sqrt((x - x2) ** 2 + (y - y2) ** 2);
}

/**
 * 2点間の角度を求めます。
 * https://stackoverflow.com/questions/17574424/how-to-use-atan2-in-combination-with-other-radian-angle-systems
 * 角度をy軸の0から時計回りに増加させたい場合は、角度をatan2（x、y）として計算します。ただし、これによりx < 0に対して負の角度が得られるため、この場合は- (2 * pi)を追加する必要があります
 * @param x
 * @param y
 * @param x2
 * @param y2
 * @returns {number}
 */
export const calcTwoPointRadian = (x, y, x2, y2) => {
  return Math.atan2(x2 - x, y2 - y) - (0.5 * Math.PI);
}