export type _PlayerStatusType = {
  x: number, // center
  y: number, // center
  r: number,
  a: number, // convert to radians
  targetPosition: {
    x?: number,
    y?: number,
  },
  rotate: number,
}
