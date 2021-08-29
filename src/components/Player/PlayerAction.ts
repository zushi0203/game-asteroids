import {calcTwoPointRadian} from "../../common/utils/functions/calcTwoPointRadian";
import {GameConsts} from "../../common/consts/GameConsts";
import {Player} from "./Player";

/**
 * プレイヤーのイベントハンドラを管理するクラスです
 */
export class PlayerAction {
  constructor() {
    // ...
  }

  /**
   * イベントハンドラの追加します
   * @param player
   */
  addEvent(player: Player) {
    GameConsts.CANVAS.addEventListener("click", (ev) => this.click(player, ev));
    GameConsts.CANVAS.addEventListener("contextmenu", (ev) => this.click(player, ev));
  }

  /**
   * イベントハンドラを削除します
   * @param player
   */
  removeEvent(player: Player) {
    GameConsts.CANVAS.removeEventListener("click", (ev) => this.click(player, ev));
    GameConsts.CANVAS.removeEventListener("contextmenu", (ev) => this.click(player, ev));
  }

  /**
   * キーを押した時の処理を行います
   * @param {*} ev
   * @returns
   */
  // private keyDown(player: Player, ev: KeyboardEvent) {
  //   // if(!player.isPlayerActive()) return;
  //   // if(player.isDead()) return;
  //
  //   switch(ev.code) {
  //     case "KeyX": // sceneDebug explode
  //       // playerExplode(player);
  //       break;
  //     case "Space": // space bar (allow shooting again)
  //       player.laser.shootLaser(player.status);
  //       player.laser.disableCanShoot();
  //       break;
  //     case "ArrowLeft": // left arrow (rotate param.Player left)
  //       player.enableRotate(0);
  //       break;
  //     case "ArrowUp": // up arrow (param.Player thrusting)
  //       player.thruster.enableThrusting();
  //       break;
  //     case "ArrowRight": // right arrow (rotate param.Player right)
  //       player.enableRotate(-1);
  //       break;
  //   }
  // };

  /**
   * キーを離した時の処理を行います
   * @param {*} ev
   * @returns
   */
  // private keyup(player: Player, ev: KeyboardEvent) {
  //   // if(player.isDead()) return;
  //
  //   switch(ev.code) {
  //     case "Space": // space bar (allow shooting again)
  //       // param.player.canShoot = true;
  //       player.laser.enableCanShoot();
  //       break;
  //     case "ArrowLeft": // left arrow (rotate param.Player left)
  //       player.disableRotate();
  //       break;
  //     case "ArrowUp": // up arrow (param.Player thrusting)
  //       player.thruster.disableThrusting();
  //       break;
  //     case "ArrowRight": // right arrow (rotate param.Player right)
  //       player.disableRotate();
  //       break;
  //   }
  // }

  /**
   * クリック時の処理を行います
   * @param player
   * @param ev
   * @private
   */
  private click(player: Player, ev: MouseEvent) {
    ev.preventDefault();

    const position = player.position.getData;
    // クリックした座標をplayer.targetPositionに設定
    const clickPosition = {
      x: ev.offsetX,
      y: ev.offsetY
    }
    player.updateTargetPosition(clickPosition);

    if(!player.targetPosition.x || !player.targetPosition.y) return;
    //　クリックした方向にangleを向ける
    const twoPointRadian = calcTwoPointRadian(position.x, position.y, player.targetPosition.x, player.targetPosition.y);
    player.updateAngle(twoPointRadian);

    if(!player.targetPosition.x || !player.targetPosition.y) return;
    // 現在とクリックした座標の距離をもとに、player.thrustを設定
    const [distanceX, distanceY] = [player.targetPosition.x - position.x, player.targetPosition.y - position.y];
    const vx = distanceX / GameConsts.FPS;
    const vy = distanceY / GameConsts.FPS;
    const thrust = {
      x: vx,
      y: vy,
    }
    player.thruster.add(thrust);
  }
}