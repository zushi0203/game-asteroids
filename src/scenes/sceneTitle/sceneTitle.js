import {background} from "../../components/Background/Background.js";
import srcName from "../../assets/title_name.png";
import srcButton from "../../assets/title_start_button.png";
import * as ENV from "../../env.js"

const titleName = new Image();
titleName.src = srcName;  // 画像のURLを指定

/**
 *
 * @param gameState
 */
export const sceneTitle = (game) => {
	background();

  ENV.ctx.drawImage(titleName, 0, 0);
}