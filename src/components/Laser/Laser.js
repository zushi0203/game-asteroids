import * as ENV from "../../env.js";
import {handleEdgeOfScreen} from "../../utils";
export class Laser {
	constructor(character) {
		this.param = {};
		this.init(character);
		this.dead = false;
	}

	init(character) {
		this.param = {
			x: character.x + 4 / 3 * character.r * Math.cos(character.a),
			y: character.y - 4 / 3 * character.r * Math.sin(character.a),
			xv: ENV.LASER_SPD * Math.cos(character.a) / ENV.FPS,
			yv: -ENV.LASER_SPD * Math.sin(character.a) / ENV.FPS,
			r: 0,
			dist: 0,
			explodeTime: 0,
		}
	}

	explode() {
		this.dead = true;
	}

	drawLaser(character) {
		const isExploding = this.param.explodeTime > 0
		if(!isExploding) {
			ENV.ctx.fillStyle = "salmon";
			ENV.ctx.beginPath();
			ENV.ctx.arc(this.param.x, this.param.y, ENV.SHIP_SIZE / 15, 0, Math.PI * 2, false);
			ENV.ctx.fill();
		} else {
			// draw the explosion this.param
			ENV.ctx.fillStyle = "orangered";
			ENV.ctx.beginPath();
			ENV.ctx.arc(this.param.x, this.param.y, character.r * 0.75, 0, Math.PI * 2, false);
			ENV.ctx.fill();
			ENV.ctx.fillStyle = "salmon";
			ENV.ctx.beginPath();
			ENV.ctx.arc(this.param.x, this.param.y, character.r * 0.5, 0, Math.PI * 2, false);
			ENV.ctx.fill();
			ENV.ctx.fillStyle = "pink";
			ENV.ctx.beginPath();
			ENV.ctx.arc(this.param.x, this.param.y, character.r * 0.25, 0, Math.PI * 2, false);
			ENV.ctx.fill();
		}
	}

	updateLasersPosition() {
		// move the lasers
		// 先頭のレーザーが最大距離に到達したら削除
		const isLaserOverDistance = this.param.dist > ENV.LASER_DIST * ENV.canvas.width;
		if(isLaserOverDistance) {
			this.dead = true;
			return;
		}

		// handle the explosion
		const isLaserExploding = this.param.explodeTime > 0;
		if(isLaserExploding) {
			// this.param.explodeTime--;
			//
			// // destroy the Laser after the duration is up
			// if(this.param.explodeTime == 0) {
			// 	character.lasers.splice(index, 1);
			// }
		} else {
			// move the Laser
			this.param.x += this.param.xv;
			this.param.y += this.param.yv;
		}

		// calculate the distance trabelled
		this.param.dist += Math.sqrt(Math.pow(this.param.xv, 2) + Math.pow(this.param.yv, 2));

		// handle edge of screen
		handleEdgeOfScreen(this.param);
	}

	isDead() {
		return this.dead;
	}

	// Laser
	update(character) {
		this.drawLaser(character);
		this.updateLasersPosition();
	}


}
