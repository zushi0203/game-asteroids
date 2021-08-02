import * as ENV from "../../env.js";
import {handleEdgeOfScreen, distBetweenPoints, calcTwoPointDistance} from "../../utils";
import { EnemyDraw } from "./functions/TrackingEnemyDraw.js";
/**
 * 一定の速度でプレイヤーを追尾する敵を生成するクラスです
 */
export class TrackingEnemy {
  constructor(level, player, trackingEnemyParam) {
    this.enemyType = "trackingEnemy"
    this.param;
    this.level = level;
    this.initialize(player, trackingEnemyParam);
  }

  createParam(x, y, r) {
    const lvlMult = 1 + 0.1 * this.level;
    const trackingEnemy = {
      x: x,
      y: y,
      xv: Math.random() * ENV.ENEMIES_SPD * lvlMult / ENV.FPS * (Math.random() < 0.5 ? 1 : -1),
      yv: Math.random() * ENV.ENEMIES_SPD * lvlMult / ENV.FPS * (Math.random() < 0.5 ? 1 : -1),
      r: r,
      a: Math.random() * Math.PI * 2, // in radians
      vert: Math.floor(Math.random() * (ENV.ENEMIES_VERT + 1) + ENV.ENEMIES_VERT / 2),
      offs: [],
      
    };
    // create the vertex offsets array
    [...Array(trackingEnemy.vert)].map((_) => {
      trackingEnemy.offs.push(Math.random() * ENV.ENEMIES_JAG * 2 + 1 - ENV.ENEMIES_JAG);
    });
  
    return trackingEnemy;
  }

  initialize(player, trackingEnemyParam) {
    let x;
    let y;
    let size;

    if(player === false) {
      x = trackingEnemyParam.posX;
      y = trackingEnemyParam.posY;
      size = trackingEnemyParam.size;
    } else {
      // 初期位置がプレイヤーから離れるまでwhile処理 
      do {
        x = Math.floor(Math.random() * ENV.canvas.width);
        y = Math.floor(Math.random() * ENV.canvas.height);
      } while (
        distBetweenPoints(player.x, player.y, x, y) < ENV.ENEMIES_SIZE * 2 + player.r
      );
      size = Math.ceil(ENV.ENEMIES_SIZE / 6);
    }

    const param = this.createParam(x, y, size);
    this.param = param;
  }

  draw() {
    EnemyDraw(this.param);
  }

  // drawDestroy() {
  //   drawExplosionEnemy(this.param);
  // }

  updatePosition(player) {
    const twoPointDistance = calcTwoPointDistance(player.x, player.y, this.param.x, this.param.y);
    const [dx, dy] = [player.x - this.param.x, player.y - this.param.y];
    const t = twoPointDistance / (ENV.ENEMIES_SPD * 2 / ENV.FPS);
    const vx = dx / t;
    const vy = dy / t;


    let x = this.param.x;
    let y = this.param.y;
    x += vx;
    y += vy;

    this.param.x = x;
    this.param.y = y;

    handleEdgeOfScreen(this.param);
  }

  update(player) {
    this.draw();
    this.updatePosition(player);
  }
}