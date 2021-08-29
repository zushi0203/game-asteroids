// import {GameConsts} from "../consts/GameConsts";
// import {PositionData} from "./classes/PositionData";
//
// /**
//  * 画面端の処理を行います
//  * @param positionData
//  */
// export const handleEdgeOfScreen = (positionData: PositionData) => {
//   const position = positionData.getData;
//   if(!position.x || !position.y || !position.r) return;
//
//   let x: number;
//   let y: number;
//
//   // x
//   if (position.x < 0 - position.r) {
//     x = GameConsts.CANVAS.width + position.r;
//   } else if (position.x > GameConsts.CANVAS.width + position.r) {
//     x = 0 - position.r;
//   } else {
//     x = position.x;
//   }
//
//   // y
//   if (position.y < 0 - position.r) {
//     y = GameConsts.CANVAS.height + position.r;
//   } else if(position.y > GameConsts.CANVAS.height + position.r) {
//     y = 0 - position.r;
//   } else {
//     y = position.y;
//   }
//
//   positionData.setData({
//     x: x,
//     y: y,
//   })
// }