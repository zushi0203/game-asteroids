import * as ENV from "../../env.js";

export const background = () => {
  ENV.ctx.fillStyle = "black";
  ENV.ctx.fillRect(0, 0, ENV.canvas.width, ENV.canvas.height);
}