/**
 * プレイヤーの定数
 */
export const PlayerConsts = {
  BLINK_DURATION: 0.1, // 非表示状態になる間隔
  EXPLODE_DURATION: 0.3, // 爆発状態の時間
  INVISIBLE_DURATION: 3, // 非表示状態の時間
  SIZE: 30, // プレイヤーの大きさ
  TURN: 360, // 回転できる度数
  THRUST: 5, // プレイヤーのアクセラレーション (px / 秒)
  SHOOT_INTERVAL: 0.2, // 射撃できる間隔
  FRICTION: 0.2, // 摩擦の値
} as const;