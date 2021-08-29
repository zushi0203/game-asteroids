import {PlayerConsts} from "../../common/consts/PlayerConsts";
import {GameConsts} from "../../common/consts/GameConsts";
import {PlayerThrusterStatusType} from "./types/PlayerThrusterStatusType";

/**
 * プレイヤーのスラスターを管理します
 */
export class PlayerThruster {
  private thrust: PlayerThrusterStatusType;
  private isThrusting: boolean;

  constructor() {
    this.thrust = {
      x: 0,
      y: 0,
    }
    this.isThrusting = false;
  }

  // 現在のスラスター情報を取得
  get currentStatus() {
    return this.thrust;
  }
  // スラスターの有効化
  enableThrusting() {
    this.isThrusting = true;
  }
  // スラスターの無効化
  disableThrusting() {
    this.isThrusting = false;
  }

  /**
   * スラスターの値を追加します
   * @param addThruster
   */
  add(addThruster: PlayerThrusterStatusType) {
    this.thrust.x += addThruster.x;
    this.thrust.y += addThruster.y;
  }

  /**
   * スラスター情報を更新します
   * @param playerAngle
   * @param isDead
   */
  update(playerAngle: number) {
    let newThrust: PlayerThrusterStatusType = {
      x: 0,
      y: 0,
    };

    if (this.isThrusting) {
      newThrust.x = this.thrust.x += PlayerConsts.THRUST * Math.cos(playerAngle) / GameConsts.FPS;
      newThrust.y = this.thrust.y -= PlayerConsts.THRUST * Math.sin(playerAngle) / GameConsts.FPS;
    } else { // not thrusting gensoku
      // thrust.x = this.thrust.x -= PlayerConsts.FRICTION * this.thrust.x / GameConsts.FPS;
      // thrust.y = this.thrust.y -= PlayerConsts.FRICTION * this.thrust.y / GameConsts.FPS;
      newThrust.x = this.thrust.x -= PlayerConsts.FRICTION * this.thrust.x / GameConsts.FPS;
      newThrust.y = this.thrust.y -= PlayerConsts.FRICTION * this.thrust.y / GameConsts.FPS;
    }

    this.thrust.x = newThrust.x;
    this.thrust.y = newThrust.y;
  }
}