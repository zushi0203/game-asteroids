import * as ENV from "../../env.js";
import {handleEdgeOfScreen, distBetweenPoints} from "../../utils/index.js";
import { drawEnemy } from "./enemyDraw.js";
import {getPlayer} from "../player/player.js";

/**
 * 敵キャラクターを生成するクラスです
 */
export class Enemy {
  constructor(level) {
    this.param;
    this.level = level;
    this.initialize();
  }

  createParam(x, y, r) {
    const lvlMult = 1 + 0.1 * this.level;
    const enemy = {
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
    [...Array(enemy.vert)].map((_) => {
      enemy.offs.push(Math.random() * ENV.ENEMIES_JAG * 2 + 1 - ENV.ENEMIES_JAG);
    });
  
    return enemy;
  }

  initialize() {
    let x;
    let y;

    const player = getPlayer();

    // 初期位置がプレイヤーから離れるまでwhile処理
    do {
      x = Math.floor(Math.random() * ENV.canvas.width);
      y = Math.floor(Math.random() * ENV.canvas.height);
    } while (
      distBetweenPoints(player.x, player.y, x, y) < ENV.ENEMIES_SIZE * 2 + player.r
    );

    const param = this.createParam(x, y, Math.ceil(ENV.ENEMIES_SIZE / 2));
    this.param = param;
  }

  draw() {
    drawEnemy(this.param);
  }

  // drawDestroy() {
  //   drawExplosionEnemy(this.param);
  // }

  updatePosition() {
    let x = this.param.x;
    let y = this.param.y;
    x += this.param.xv;
    y += this.param.yv;

    this.param.x = x;
    this.param.y = y;

    handleEdgeOfScreen(this.param);
  }

  update() {
    this.draw();
    this.updatePosition();
  }
}