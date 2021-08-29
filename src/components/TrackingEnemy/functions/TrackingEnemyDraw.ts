import {GameConsts} from "../../../common/consts/GameConsts";
import {PlayerConsts} from "../../../common/consts/PlayerConsts";
import {PositionDataType} from "../../../common/types/PositionDataType";

/**
 * 追尾する敵キャラクターを描画します
 * @param position
 * @param vert
 * @param offs
 * @constructor
 */
export const TrackingEnemyDraw = (position: PositionDataType["default"], vert: number, offs: number[]) => {
  // draw a path
  GameConsts.CTX.lineWidth = PlayerConsts.SIZE / 20;
  GameConsts.CTX.strokeStyle = "yellow";
  GameConsts.CTX.beginPath();
  GameConsts.CTX.moveTo(
    position.x + position.r * offs[0] * Math.cos(position.a),
    position.y + position.r * offs[0] * Math.sin(position.a)
  );
    
  // draw the polygon
  [...Array(vert)].map((_, index) => {
    GameConsts.CTX.lineTo(
      position.x + position.r * offs[index] * Math.cos(position.a + index * Math.PI * 2 / vert),
      position.y + position.r * offs[index] * Math.sin(position.a + index * Math.PI * 2 / vert)
    );
  });
  GameConsts.CTX.closePath();
  GameConsts.CTX.stroke();

  // if(ENV.SHOW_BOUNDING) {
  //   GameConsts.CTX.strokeStyle = "lime";
  //   GameConsts.CTX.beginPath();
  //   GameConsts.CTX.arc(Enemy.x, Enemy.y, Enemy.r, 0, Math.PI * 2);
  //   GameConsts.CTX.stroke();
  // }
}