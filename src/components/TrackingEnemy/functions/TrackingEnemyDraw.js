import * as ENV from "../../../env.js";

export const EnemyDraw = (enemy) => {
  // draw a path
  ENV.ctx.lineWidth = ENV.SHIP_SIZE / 20;
  ENV.ctx.strokeStyle = "yellow";
  ENV.ctx.beginPath();
  ENV.ctx.moveTo(
    enemy.x + enemy.r * enemy.offs[0] * Math.cos(enemy.a), 
    enemy.y + enemy.r * enemy.offs[0] * Math.sin(enemy.a)
  );
    
  // draw the polygon
  [...Array(enemy.vert)].map((_, index) => {
    ENV.ctx.lineTo(
      enemy.x + enemy.r * enemy.offs[index] * Math.cos(enemy.a + index * Math.PI * 2 / enemy.vert),
      enemy.y + enemy.r * enemy.offs[index] * Math.sin(enemy.a + index * Math.PI * 2 / enemy.vert)
    );
  });
  ENV.ctx.closePath();
  ENV.ctx.stroke();

  // if(ENV.SHOW_BOUNDING) {
  //   ENV.ctx.strokeStyle = "lime";
  //   ENV.ctx.beginPath();
  //   ENV.ctx.arc(Enemy.x, Enemy.y, Enemy.r, 0, Math.PI * 2);
  //   ENV.ctx.stroke();
  // }
}