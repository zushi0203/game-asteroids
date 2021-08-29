import {LaserConsts} from "../../common/consts/LaserConsts";
import {Laser} from "../Laser/Laser";
import {PlayerConsts} from "../../common/consts/PlayerConsts";
import {GameConsts} from "../../common/consts/GameConsts";
import {PositionDataType} from "../../common/types/PositionDataType";
// import {_ComponentPositionType} from "../../common/types/_ComponentPositionType";

/**
 * プレイヤーのレーザーを管理します
 */
export class PlayerLaser {
  canShoot: boolean;
  shootTime: number;
  lasers: Laser[];

  constructor() {
    this.canShoot = true;
    this.shootTime = 0;
    this.lasers = [];
  }

  // 射撃の有効化
  enableCanShoot() {
    this.canShoot = true;
  }
  // 射撃の無効化
  disableCanShoot = () => {
    this.canShoot = false;
  }

  /**
   * lasers配列にあるレーザーの更新を行います
   */
  updateLasers() {
    // update Laser
    this.lasers.forEach((laser, index) => {
      if(laser.isDead()) {
        this.lasers.splice(index, 1);
      } else {
        laser.update()
      }
    });
  }

  /**
   * 射撃を行います
   * @param playerPosition
   */
  // shootLaser(playerPosition: _ComponentPositionType) {
  //   // create the Laser object
  //   if(this.canShoot && this.lasers.length < LaserConsts.MAX) {
  //     const laser: Laser = new Laser(playerPosition);
  //     this.lasers.push(laser);
  //   }
  //   // prevent further shooting
  //   this.canShoot = false;
  //   console.log("shoot", this.lasers);
  // }

  /**
   * 自動射撃を行います
   * @param startPosition
   */
  autoShootLaser(startPosition: PositionDataType["default"]) {
    if(0 < this.shootTime) {
      this.shootTime--;
      return;
    }

    if(this.lasers.length < LaserConsts.MAX) {
      const laser = new Laser(startPosition);
      this.lasers.push(laser);
      this.shootTime = Math.ceil(PlayerConsts.SHOOT_INTERVAL * GameConsts.FPS);
    }
  }
}