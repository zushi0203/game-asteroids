import {GameConsts} from "../../common/consts/GameConsts";
import {PlayerConsts} from "../../common/consts/PlayerConsts";
import {playerDraw, playerExplosionDraw} from "./functions/playerDraw";
import {PlayerLaser} from "./PlayerLaser";
import {PlayerThruster} from "./PlayerThruster";
import {PlayerAction} from "./PlayerAction";
import {PlayerClickPositionType} from "./types/PlayerClickPositionType";
import {PositionData} from "../../common/utils/classes/PositionData";

/**
 * プレイヤーを生成するクラス
 */
export class Player {
  position: PositionData;
  private rotate: number;
  private blinkNum: number;
  private blinkTime: number;
  private explodeTime: number;
  thruster: PlayerThruster;
  laser: PlayerLaser;
  action: PlayerAction;

  targetPosition: {
    x: number | undefined,
    y: number | undefined,
  }

  constructor() {
    this.position    = new PositionData();
    this.targetPosition = {
      x: undefined,
      y: undefined,
    };
    this.rotate = 0;
    this.blinkNum = 0;
    this.blinkTime = 0;
    this.explodeTime = 0;
    this.thruster = new PlayerThruster();
    this.laser = new PlayerLaser();
    this.action = new PlayerAction();
  }

  // 非表示状態の判定
  isBlink() {
    return this.blinkNum > 0;
  };
  // 爆発中の判定
  isExploding() {
    return this.explodeTime > 0;
  };
  // プレイヤーのイベントハンドラを追加
  addAction() {
    this.action.addEvent(this);
  }
  // プレイヤーのイベントハンドラを削除
  removeAction() {
    this.action.removeEvent(this);
  }
  // 回転の有効化
  // enableRotate(WAKARANAI: number | undefined) {
  //   let rotateValue = PlayerConsts.TURN / 180 * Math.PI / GameConsts.FPS;
  //   if(WAKARANAI !== undefined) rotateValue *= WAKARANAI;
  //   this.status.rotate = rotateValue;
  // }
  // 回転の無効化
  // disableRotate() {
  //   this.status.rotate = 0;
  // }
  // 爆発の処理
  die() {
    this.explodeTime = Math.ceil(PlayerConsts.EXPLODE_DURATION * GameConsts.FPS);
  }

  /**
   * コンストラクタ情報に初期値を設定します
   */
  init() {
    this.position.setData({
      x: GameConsts.CANVAS.width / 2, // center
      y: GameConsts.CANVAS.height / 2, // center
      r: PlayerConsts.SIZE / 2,
      a: 90 / 180 * Math.PI, // convert to radians
    });
    this.targetPosition = {
      x: undefined,
      y: undefined,
    };
    this.blinkNum = Math.ceil(PlayerConsts.INVISIBLE_DURATION / PlayerConsts.BLINK_DURATION);
    this.blinkTime = Math.ceil(PlayerConsts.BLINK_DURATION * GameConsts.FPS);
    this.explodeTime = 0;
  }

  /**
   * 目的座標の情報を更新します
   * @param clickPosition
   */
  updateTargetPosition(clickPosition: PlayerClickPositionType) {
    this.targetPosition = clickPosition;
  }

  /**
   * 座標情報を更新します
   */
  updatePosition() {
    const position = this.position.getData;
    this.position.setData({
      x: position.x += this.thruster.currentStatus.x,
      y: position.y += this.thruster.currentStatus.y,
      a: position.a += this.rotate,
    })
  }

  /**
   * 非表示時間を管理します
   */
  updateBlink() {
    if(!this.isBlink()) return;
    // 非表示時間を減らします
    this.blinkTime--;

    // 非表示時間が0になった場合、非表示回数のカウントを減らします
    if(this.blinkTime == 0) {
      this.blinkTime = Math.ceil(PlayerConsts.BLINK_DURATION * GameConsts.FPS);
      this.blinkNum--;
    }
  }

  /**
   * 向きを更新します
   * @param radian
   */
  updateAngle(radian: number) {
    this.position.setData({
      a: radian,
    })
  }

  /**
   * 爆発時間を管理します
   */
  updateExplodeTime() {
    this.explodeTime--;

    const isExploding = this.explodeTime > 0;
    if(isExploding) return;
    // 爆発が終了したらコンストラクタ情報を初期化
    this.init();
  }

  /**
   * 更新時の描画を管理します
   */
  manageDraw() {
    const isBlinkOn = this.blinkNum % 2 === 0;
    const position = this.position.getData;

    if(this.isExploding()) {
      // 爆発中の場合、爆発の描画
      playerExplosionDraw(position);
      this.updateExplodeTime();

    } else if(!isBlinkOn) {
      // 非表示処理
      this.updateBlink();

    } else {
      // 通常の描画
      playerDraw(position, 20);
      this.updateBlink();
    }
  }

  /**
   * プレイヤー情報を更新します
   */
  update() {
    const position = this.position.getData;

    if(!this.isExploding()) {
      this.thruster.update(position.a);
      this.updatePosition();
    }
    // 描画の管理
    this.manageDraw();
    // リスポーン中じゃない場合、自動射撃
    if(!this.isBlink()) {
      this.laser.autoShootLaser(position);
    }
    // 画面端の処理
    this.position.handleEdgeOfScreen();
    // レーザーの更新
    this.laser.updateLasers();
  }
}