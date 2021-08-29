import {GameConsts} from "../../common/consts/GameConsts";

/**
 * 背景を描画する関数です
 */
export const background = () => {
  GameConsts.CTX.fillStyle = "black";
  GameConsts.CTX.fillRect(0, 0, GameConsts.CANVAS.width, GameConsts.CANVAS.height);
}