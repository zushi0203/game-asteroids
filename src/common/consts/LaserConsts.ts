/**
 * レーザーの定数
 */
export const LaserConsts: any = {
  DIST: 0.6, // レーザーが画面の一部として移動できる最大距離
  MAX: 10, // 表示できるレーラー数
  SPEED: 500, // speed of lasers in pixeld per second
  EXPLODE_DURATION: 0.1, // duration of the lasers explosion in seconds
} as const;