/**
 * 2点間の距離を求めます
 * @param x
 * @param y
 * @param x2
 * @param y2
 */
export const calcTwoPointDistance = (x:number, y: number, x2: number, y2: number): number => {
  return Math.sqrt((x - x2) ** 2 + (y - y2) ** 2);
}
