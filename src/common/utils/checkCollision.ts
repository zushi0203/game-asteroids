/**
 * コンポーネント同士が衝突しているかチェックします
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @return boolean
 */
export const checkCollision = (targetX: number, targetY: number, targetR: number, nextTargetX: number, nextTargetY: number, nextTargetR: number): boolean => {
  return Math.sqrt(Math.pow(nextTargetX - targetX, 2) + Math.pow(nextTargetY - targetY, 2)) < targetR + nextTargetR;
}