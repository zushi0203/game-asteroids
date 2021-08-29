import {GameConsts} from "../../common/consts/GameConsts";
import {LaserConsts} from "../../common/consts/LaserConsts";
import {laserDraw} from "./funtions/laserDraw";
import {PositionData} from "../../common/utils/classes/PositionData";
import {PositionDataType} from "../../common/types/PositionDataType";

/**
 * レーザーを生成するクラス
 */
export class Laser {
	position: PositionData;
	dist: number;
	explodeTime: number;
	dead: boolean;

	constructor(initPosition: PositionDataType["default"]) {
		this.position = new PositionData();
		this.dist = 0;
		this.explodeTime = 0;
		this.dead = false;
		this.init(initPosition);
	}

	// 寿命の処理
	die() {
		this.dead = true;
	}
	// 寿命の判定
	isDead() {
		return this.dead;
	}

	/**
	 * 座標情報の初期値を設定します
	 * @param position
	 */
 	private init(position: PositionDataType["default"]) {
		this.position.setData({
			x: position.x + 4 / 3 * position.r * Math.cos(position.a),
			y: position.y - 4 / 3 * position.r * Math.sin(position.a),
			vx: LaserConsts.SPEED * Math.cos(position.a) / GameConsts.FPS,
			vy: -LaserConsts.SPEED * Math.sin(position.a) / GameConsts.FPS,
			r: 0,
			a: 0,
		})
		this.dist = 0;
		this.explodeTime = 0;
		this.dead = false;
	}

	/**
	 * レーザーを描画します
	 */
	private draw() {
		laserDraw(this.position.getData, this.explodeTime);
	}

	/**
	 * 座標情報を更新します
	 */
	private updatePosition() {
		const position = this.position.getData;
		const isLaserOverDistance = this.dist > LaserConsts.DIST * GameConsts.CANVAS.width;

		if(isLaserOverDistance) {
			// 先頭のレーザーが最大距離に到達したら削除
			this.die();
			return;
		}

		const isLaserExploding = this.explodeTime > 0;
		if(isLaserExploding) {
			// 爆発中の処理
			// this.status.explodeTime--;
			// 爆発処理が終了後、レーザーを削除
			// if(this.status.explodeTime == 0) {
			// 	componentPosition.lasers.splice(index, 1);
			// }
		} else {
			// 爆発中でない場合、座標を更新
			position.x += position.vx;
			position.y += position.vy;
		}
		// 移動距離を計算
		this.dist += Math.sqrt(Math.pow(position.vx, 2) + Math.pow(position.vy, 2));
		// 画面端の処理
		this.position.handleEdgeOfScreen();
	}

	/**
	 * レーザー情報を更新します
	 */
	update() {
		this.draw();
		this.updatePosition();
	}
}
