import {GameConsts} from "../../../common/consts/GameConsts";
import {PlayerConsts} from "../../../common/consts/PlayerConsts";
import {PositionDataType} from "../../../common/types/PositionDataType";

/**
 * プレイヤーを描画する関数です
 * @param position
 * @param size
 */
export const playerDraw = (position: PositionDataType["default"], size: number) => {
  // GameConsts.CTX.strokeStyle = position.thrusting ? "yellow" : "white";
  GameConsts.CTX.strokeStyle = "white";
  GameConsts.CTX.lineWidth = PlayerConsts.SIZE / size;

  GameConsts.CTX.beginPath();
  GameConsts.CTX.moveTo( // 頂点 (先端)
    position.x + 4 / 3 * position.r * Math.cos(position.a),
    position.y - 4 / 3 * position.r * Math.sin(position.a)
  );

  GameConsts.CTX.lineTo( // 左側の点
    position.x - position.r * (2 / 3 * Math.cos(position.a) + Math.sin(position.a)),
    position.y + position.r * (2 / 3 * Math.sin(position.a) - Math.cos(position.a))
  );
  GameConsts.CTX.lineTo( // 右側の点
    position.x - position.r * (2 / 3 * Math.cos(position.a) - Math.sin(position.a)),
    position.y + position.r * (2 / 3 * Math.sin(position.a) + Math.cos(position.a))
  );
  GameConsts.CTX.closePath();
  GameConsts.CTX.stroke();

  GameConsts.CTX.fillStyle = "darkred";
  GameConsts.CTX.beginPath();
  GameConsts.CTX.arc(position.x + 4 / 3 * position.r * Math.cos(position.a), position.y - 4 / 3 * position.r * Math.sin(position.a), position.r * 0.2, 0, Math.PI * 2, false);
  GameConsts.CTX.fill();


  // GameConsts.CTX.strokeStyle = "lime";
  // GameConsts.CTX.beginPath();
  // GameConsts.CTX.arc(position.x, position.y, position.r, 0, Math.PI * 2);
  // GameConsts.CTX.stroke();
}

/**
 * プレイヤーの爆発を描画する関数です
 * @param position
 */
export const playerExplosionDraw = (position: PositionDataType["default"]) => {
  GameConsts.CTX.fillStyle = "darkred";
  GameConsts.CTX.beginPath();
  GameConsts.CTX.arc(position.x, position.y, position.r * 1.7, 0, Math.PI * 2, false);
  GameConsts.CTX.fill();
  GameConsts.CTX.fillStyle = "red";
  GameConsts.CTX.beginPath();
  GameConsts.CTX.arc(position.x, position.y, position.r * 1.4, 0, Math.PI * 2, false);
  GameConsts.CTX.fill();
  GameConsts.CTX.fillStyle = "orange";
  GameConsts.CTX.beginPath();
  GameConsts.CTX.arc(position.x, position.y, position.r * 1.1, 0, Math.PI * 2, false);
  GameConsts.CTX.fill();
  GameConsts.CTX.fillStyle = "yellow";
  GameConsts.CTX.beginPath();
  GameConsts.CTX.arc(position.x, position.y, position.r * 0.8, 0, Math.PI * 2, false);
  GameConsts.CTX.fill();
  GameConsts.CTX.fillStyle = "white";
  GameConsts.CTX.beginPath();
  GameConsts.CTX.arc(position.x, position.y, position.r * 0.5, 0, Math.PI * 2, false);
  GameConsts.CTX.fill();
}