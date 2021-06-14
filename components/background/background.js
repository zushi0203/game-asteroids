import * as ENV from "../../common/env.js";

export const setBackground = () => {
  ENV.ctx.fillStyle = "black";
  ENV.ctx.fillRect(0, 0, ENV.canvas.width, ENV.canvas.height);
}