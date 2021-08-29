export type PositionDataType = {
  default: {
    x : number,
    y : number,
    vx: number,
    vy: number,
    r : number,
    a : number,
  },
  argument: {
    x ?: number,
    y ?: number,
    vx?: number,
    vy?: number,
    r ?: number,
    a ?: number,
  }
}