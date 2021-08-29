import {background} from "../../components/Background/Background";
import srcName from "../../assets/title_name.png";
import {GameConsts} from "../../common/consts/GameConsts"

const titleName = new Image();
titleName.src = srcName;  // 画像のURLを指定

/**
 *
 * @param gameManager
 */
export const sceneTitle = () => {
	background();

  GameConsts.CTX.drawImage(titleName, 0, 0);
}