import * as ENV from "../../common/env.js";

export const drawPlayer = (player, size) => {
  ENV.ctx.strokeStyle = player.thrusting ? "yellow" : "white";
  ENV.ctx.lineWidth = ENV.SHIP_SIZE / size;

  ENV.ctx.beginPath();
  ENV.ctx.moveTo( // nose of the player
    player.x + 4 / 3 * player.r * Math.cos(player.a),
    player.y - 4 / 3 * player.r * Math.sin(player.a)
  );

  ENV.ctx.lineTo( // rear left
    player.x - player.r * (2 / 3 * Math.cos(player.a) + Math.sin(player.a)),
    player.y + player.r * (2 / 3 * Math.sin(player.a) - Math.cos(player.a))
  );
  ENV.ctx.lineTo( // rear right
    player.x - player.r * (2 / 3 * Math.cos(player.a) - Math.sin(player.a)),
    player.y + player.r * (2 / 3 * Math.sin(player.a) + Math.cos(player.a))
  );
  ENV.ctx.closePath();
  ENV.ctx.stroke();
}

export const drawExplosionPlayer = (player) => {
  // draw the explosion
  ENV.ctx.fillStyle = "darkred";
  ENV.ctx.beginPath();
  ENV.ctx.arc(player.x, player.y, player.r * 1.7, 0, Math.PI * 2, false);
  ENV.ctx.fill();
  ENV.ctx.fillStyle = "red";
  ENV.ctx.beginPath();
  ENV.ctx.arc(player.x, player.y, player.r * 1.4, 0, Math.PI * 2, false);
  ENV.ctx.fill();
  ENV.ctx.fillStyle = "orange";
  ENV.ctx.beginPath();
  ENV.ctx.arc(player.x, player.y, player.r * 1.1, 0, Math.PI * 2, false);
  ENV.ctx.fill();
  ENV.ctx.fillStyle = "yellow";
  ENV.ctx.beginPath();
  ENV.ctx.arc(player.x, player.y, player.r * 0.8, 0, Math.PI * 2, false);
  ENV.ctx.fill();
  ENV.ctx.fillStyle = "white";
  ENV.ctx.beginPath();
  ENV.ctx.arc(player.x, player.y, player.r * 0.5, 0, Math.PI * 2, false);
  ENV.ctx.fill();
}

// draw the lasers
export const drawPlayerLaser = (player) => {
  [...player.lasers].forEach(laser => {
    const isExploding = laser.explodeTime > 0
    if(!isExploding) {
      ENV.ctx.fillStyle = "salmon";
      ENV.ctx.beginPath();
      ENV.ctx.arc(laser.x, laser.y, ENV.SHIP_SIZE / 15, 0, Math.PI * 2, false);
      ENV.ctx.fill();
    } else {
      // draw the explosion laser
      ENV.ctx.fillStyle = "orangered";
      ENV.ctx.beginPath();
      ENV.ctx.arc(laser.x, laser.y, player.r * 0.75, 0, Math.PI * 2, false);
      ENV.ctx.fill();
      ENV.ctx.fillStyle = "salmon";
      ENV.ctx.beginPath();
      ENV.ctx.arc(laser.x, laser.y, player.r * 0.5, 0, Math.PI * 2, false);
      ENV.ctx.fill();
      ENV.ctx.fillStyle = "pink";
      ENV.ctx.beginPath();
      ENV.ctx.arc(laser.x, laser.y, player.r * 0.25, 0, Math.PI * 2, false);
      ENV.ctx.fill();
    }
  });
} 