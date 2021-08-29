import {GameConsts} from "../../common/consts/GameConsts";
import {EnemyConsts} from "../../common/consts/EnemyConsts";
// import {handleEdgeOfScreen} from "../../common/utils/handleEdgeOfScreen";
import {calcDistBetweenPoints} from "../../common/utils/calcDistBetweenPoints";
// import {_ComponentPositionType} from "../../common/types/_ComponentPositionType";
import {enemyDraw} from "./functions/enemyDraw";
// import {_EnemyStatusType} from "./types/_EnemyStatusType";
import {EnemyInitPositionType} from "./types/EnemyInitPositionType";
import {EnemyNameType} from "../../common/types/EnemyNameType";
import {PositionData} from "../../common/utils/classes/PositionData";
import {PositionDataType} from "../../common/types/PositionDataType";

/**
 * 敵キャラクターを生成するクラス
 */
export class Enemy {
  enemyType: EnemyNameType;
  // status: _EnemyStatusType;
  level: number;
  vert: number;
  offs: number[];
  position: PositionData;

  constructor(
    level: number,
    avoidPosition: PositionDataType["default"] | false,
    initPosition: EnemyInitPositionType | false
  ){
    this.enemyType = "enemy";
    // this.status = {
    //   x: 0,
    //   y: 0,
    //   vx: 0,
    //   vy: 0,
    //   r: 0,
    //   a: 0, // in radians
    //   vert: 0,
    //   offs: [], // 角の位置（配列の数で角の数を決める）
    // };
    this.vert = 0;
    this.offs = [];
    this.level = level;
    this.position = new PositionData();

    this.init(avoidPosition, initPosition);
  }

  /**
   * 初期化時の初期値を設定します
   * @param avoidPosition
   * @param initPosition
   */
  init(
    avoidPosition: PositionDataType["default"] | false,
    initPosition: EnemyInitPositionType | false
  ){
    let x: number;
    let y: number;
    let r: number;

    if(initPosition) {
      // 初期値の座標がある場合は初期値の座標を設定
      x = initPosition.x;
      y = initPosition.y;
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
      r = Math.ceil(EnemyConsts.SIZE / 2);
    }

    const lvlMult = 1 + 0.5 * this.level;

    // 座標情報の設定
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
  }

  /**
   * 座標情報の初期値を設定します
   * @param x
   * @param y
   * @param r
   */
  // private initStatus(x: number, y: number, r: number) {
  //   const lvlMult: number = 1 + 0.5 * this.level;
  //   // const enemy: _EnemyStatusType = {
  //   //   x: x,
  //   //   y: y,
  //   //   vx: Math.random() * EnemyConsts.SPEED * lvlMult / GameConsts.FPS * (Math.random() < 0.5 ? 1 : -1),
  //   //   vy: Math.random() * EnemyConsts.SPEED * lvlMult / GameConsts.FPS * (Math.random() < 0.5 ? 1 : -1),
  //   //   r: r,
  //   //   a: Math.random() * Math.PI * 2, // in radians
  //   //   vert: Math.floor(Math.random() * (EnemyConsts.VERTIUCES + 1) + EnemyConsts.VERTIUCES / 2),
  //   //   offs: [],
  //   // };
  //   // // create the vertex offsets array
  //   // [...Array(enemy.vert)].map((_) => {
  //   //   enemy.offs.push(Math.random() * EnemyConsts.JAGGEDNESS * 2 + 1 - EnemyConsts.JAGGEDNESS);
  //   // });
  //
  //   this.position.setData({
  //       x: x,
  //       y: y,
  //       vx: Math.random() * EnemyConsts.SPEED * lvlMult / GameConsts.FPS * (Math.random() < 0.5 ? 1 : -1),
  //       vy: Math.random() * EnemyConsts.SPEED * lvlMult / GameConsts.FPS * (Math.random() < 0.5 ? 1 : -1),
  //       r: r,
  //       a: Math.random() * Math.PI * 2, // in radians
  //   });
  //
  //   this.vert = Math.floor(Math.random() * (EnemyConsts.VERTIUCES + 1) + EnemyConsts.VERTIUCES / 2);
  //
  //   [...Array(this.vert)].map((_) => {
  //     this.offs.push(Math.random() * EnemyConsts.JAGGEDNESS * 2 + 1 - EnemyConsts.JAGGEDNESS);
  //   });
  // }

  /**
   * 敵キャラクターを描画します
   */
  private draw() {
    enemyDraw(this.position.getData, this.vert, this.offs);
  }

  // drawDestroy() {
  //   drawExplosionEnemy(this.status);
  // }

  /**
   * 座標情報を更新します
   */
  private updatePosition() {
    const position = this.position.getData;

    let x = position.x + position.vx;
    let y = position.y + position.vy;

    this.position.setData({
      x: x,
      y: y,
    });

    this.position.handleEdgeOfScreen();
  }

  /**
   * 敵キャラクター情報を更新します
   */
  update() {
    this.draw();
    this.updatePosition();
  }
}