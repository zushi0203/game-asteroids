/**
 * 2点間の距離を計算します
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 */
export const calcDistBetweenPoints = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}