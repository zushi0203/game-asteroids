import {GameConsts} from "../../../common/consts/GameConsts";
import {PlayerConsts} from "../../../common/consts/PlayerConsts";
import {PositionDataType} from "../../../common/types/PositionDataType";

/**
 * レーザーを描画する関数です
 * @param position
 * @param explodeTime
 */
export const laserDraw = (position: PositionDataType["default"], explodeTime: number) => {
  const isExploding = explodeTime > 0
  if(!isExploding) {
    GameConsts.CTX.fillStyle = "salmon";
    GameConsts.CTX.beginPath();
    GameConsts.CTX.arc(position.x, position.y, PlayerConsts.SIZE / 15, 0, Math.PI * 2, false);
    GameConsts.CTX.fill();
  } else {
    // draw the explosion laserPosition
    GameConsts.CTX.fillStyle = "orangered";
    GameConsts.CTX.beginPath();
    GameConsts.CTX.arc(position.x, position.y, position.r * 0.75, 0, Math.PI * 2, false);
    GameConsts.CTX.fill();
    GameConsts.CTX.fillStyle = "salmon";
    GameConsts.CTX.beginPath();
    GameConsts.CTX.arc(position.x, position.y, position.r * 0.5, 0, Math.PI * 2, false);
    GameConsts.CTX.fill();
    GameConsts.CTX.fillStyle = "pink";
    GameConsts.CTX.beginPath();
    GameConsts.CTX.arc(position.x, position.y, position.r * 0.25, 0, Math.PI * 2, false);
    GameConsts.CTX.fill();
  }
}