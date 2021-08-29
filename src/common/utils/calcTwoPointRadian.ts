/**
 * 2点間の角度を求めます
 * https://stackoverflow.com/questions/17574424/how-to-use-atan2-in-combination-with-other-radian-angle-systems
 * 角度をy軸の0から時計回りに増加させたい場合は、角度をatan2（x、y）として計算します。ただし、これによりx < 0に対して負の角度が得られるため、この場合は- (2 * pi)を追加する必要があります
 * @param x
 * @param y
 * @param x2
 * @param y2
 */
export const calcTwoPointRadian = (x: number, y: number, x2: number, y2: number): number => {
  return Math.atan2(x2 - x, y2 - y) - (0.5 * Math.PI);
}