import * as ENV from "../../../env.js";

export const drawPlayer = (player, size) => {
  ENV.ctx.strokeStyle = player.thrusting ? "yellow" : "white";
  ENV.ctx.lineWidth = ENV.SHIP_SIZE / size;

  ENV.ctx.beginPath();
  ENV.ctx.moveTo( // nose of the Player
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

  ENV.ctx.fillStyle = "darkred";
  ENV.ctx.beginPath();
  ENV.ctx.arc(player.x + 4 / 3 * player.r * Math.cos(player.a), player.y - 4 / 3 * player.r * Math.sin(player.a), player.r * 0.2, 0, Math.PI * 2, false);
  ENV.ctx.fill();


  // ENV.ctx.strokeStyle = "lime";
  // ENV.ctx.beginPath();
  // ENV.ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2);
  // ENV.ctx.stroke();
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