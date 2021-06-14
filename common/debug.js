// show bounting
if(ENV.SHOW_BOUNDING) {
  ENV.ctx.strokeStyle = "lime";
  ENV.ctx.beginPath();
  ENV.ctx.arc(param.player.x, param.player.y, param.player.r, 0, Math.PI * 2);
  ENV.ctx.stroke();
}

// param.player center dot
if(ENV.SHOW_CENTRE_DOT) {
  ENV.ctx.fillStyle = "red";
  ENV.ctx.fillRect(param.player.x - 1, param.player.y - 1, 2, 2);
}
