import {GameConsts} from "../../common/consts/GameConsts";
import {EnemyConsts} from "../../common/consts/EnemyConsts";
import {calcDistBetweenPoints} from "../../common/utils/functions/calcDistBetweenPoints";
import {calcTwoPointDistance} from "../../common/utils/functions/calcTwoPointDistance";
import {TrackingEnemyDraw} from "./functions/TrackingEnemyDraw";
import {TrackingEnemyInitPositionType} from "./types/TrackingEnemyInitPositionType";
import {EnemyNameType} from "../../common/types/EnemyNameType";
import {PositionData} from "../../common/utils/classes/PositionData";
import {PositionDataType} from "../../common/types/PositionDataType";

/**
 * 一定の速度でプレイヤーを追尾する敵を生成するクラスです
 */
export class TrackingEnemy {
  position: PositionData;
  enemyType: EnemyNameType;
  level: number;
  vert: number;
  offs: number[];

  constructor(
      level: number,
      avoidPosition: PositionDataType["default"] | false,
      initPosition: TrackingEnemyInitPositionType | false,
  ){
    this.enemyType = "trackingEnemy";
    this.position = new PositionData();
    this.level = level;
    this.vert = 0;
    this.offs = []; // 角の位置（配列の数で角の数を決める）

    this.init(avoidPosition, initPosition);
  }

  /**
   * 初期化時の初期値を設定します
   * @param avoidPosition
   * @param initPosition
   */
  init(avoidPosition: PositionDataType["default"] | false, initPosition: TrackingEnemyInitPositionType | false) {
    let x: number;
    let y: number;
    let r: number;

    if(initPosition) {
      x = initPosition.posX;
      y = initPosition.posY;
      r = initPosition.size;
    } else {
      // 初期位置がプレイヤーから離れるまでwhile処理
      if (avoidPosition === false) return;
      do {
        x = Math.floor(Math.random() * GameConsts.CANVAS.width);
        y = Math.floor(Math.random() * GameConsts.CANVAS.height);
      } while (
          calcDistBetweenPoints(avoidPosition.x, avoidPosition.y, x, y) < EnemyConsts.SIZE * 2 + avoidPosition.r
          );
      r = Math.ceil(EnemyConsts.SIZE / 6);
    }

    // 座標情報の設定
    const lvlMult = 1 + 0.5 * this.level;
    this.position.setData({
      x: x,
      y: y,
      vx: Math.random() * EnemyConsts.SPEED * lvlMult / GameConsts.FPS * (Math.random() < 0.5 ? 1 : -1),
      vy: Math.random() * EnemyConsts.SPEED * lvlMult / GameConsts.FPS * (Math.random() < 0.5 ? 1 : -1),
      r: r,
      a: Math.random() * Math.PI * 2, // in radians
    });

    // 頂点の平均値を設定
    this.vert = Math.floor(Math.random() * (EnemyConsts.VERTIUCES + 1) + EnemyConsts.VERTIUCES / 2);

    // 角の設定
    [...Array(this.vert)].map((_) => {
      this.offs.push(Math.random() * EnemyConsts.JAGGEDNESS * 2 + 1 - EnemyConsts.JAGGEDNESS);
    });

    // const status = this.initStatus(x, y, r);
    // this.status = status;
  }

  /**
   * 追尾敵キャラクターを描画します
   */
  draw() {
    TrackingEnemyDraw(this.position.getData, this.vert, this.offs);
  }

  /**
   * 座標情報を更新します
   * @param trackingPosition
   */
  updatePosition(trackingPosition: PositionDataType["default"]) {
    if(!trackingPosition) return;

    const position = this.position.getData;

    const twoPointDistance = calcTwoPointDistance(trackingPosition.x, trackingPosition.y, position.x, position.y);
    const [dx, dy] = [trackingPosition.x - position.x, trackingPosition.y - position.y];
    const t = twoPointDistance / (EnemyConsts.SPEED * 2 / GameConsts.FPS);
    const vx = dx / t;
    const vy = dy / t;

    let x = position.x + vx;
    let y = position.y + vy;

    this.position.setData({
      x: x,
      y: y,
    });

    this.position.handleEdgeOfScreen();
  }

  /**
   * 追尾敵キャラクター情報を更新します
   * @param targetPosition
   */
  update(trackingPosition: PositionDataType["default"]) {
    this.draw();
    this.updatePosition(trackingPosition);
  }
}