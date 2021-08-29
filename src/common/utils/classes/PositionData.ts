import {PositionDataType} from "../../types/PositionDataType";
import {GameConsts} from "../../consts/GameConsts";

/**
 * 座標情報を管理するクラスです
 */
export class PositionData {
  private data: PositionDataType["default"];
  constructor() {
    this.data = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      r: 0,
      a: 0,
    }
  }

  setData(newData: PositionDataType["argument"]) {
    this.data = {
      ...this.data,
      ...newData,
    };
  }

  get getData() {
    return this.data;
  }



  /**
   * 画面端の処理を行います
   * @param positionData
   */
  handleEdgeOfScreen = () => {
    // x
    if (this.data.x < 0 - this.data.r) {
      this.data.x = GameConsts.CANVAS.width + this.data.r;
    } else if (this.data.x > GameConsts.CANVAS.width + this.data.r) {
      this.data.x = 0 - this.data.r;
    } else {
      this.data.x = this.data.x;
    }

    // y
    if (this.data.y < 0 - this.data.r) {
      this.data.y = GameConsts.CANVAS.height + this.data.r;
    } else if(this.data.y > GameConsts.CANVAS.height + this.data.r) {
      this.data.y = 0 - this.data.r;
    } else {
      this.data.y = this.data.y;
    }
  }
}