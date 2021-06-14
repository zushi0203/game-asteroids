import * as ENV from "./common/env.js";
import { newGame } from "./components/game/game.js"; 
import { setBackground  } from "./components/background/background.js";
import { getPlayer, updatePlayer, playerHandleKeyDown, playerHandleKeyup } from "./components/player/player.js";
import { updateEnemy, getEnemies } from "./components/enemy/enemy.js";

// set up the game parameters
newGame();

// set up event handlers
document.addEventListener("keydown", (ev) => {
  playerHandleKeyDown(ev);
});
document.addEventListener("keyup", (ev) => {
  playerHandleKeyup(ev);
});

// initialize the timer variables and start the animation
let fpsInterval, now, then, elapsed;
startAnimating(20);

function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  animate();
}

function animate() {
  requestAnimationFrame(animate);

  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    render();
  }

}

function render() {
  // draw stage
  setBackground();
  
  // update the player
  updatePlayer(getEnemies());

  // draw the game text
  // if(param.levelTextAlpha >= 0) {
  //   pushLevelMessage(param.levelText, param.levelTextAlpha);
  //   param.levelTextAlpha -= (1.0 / ENV.TEXT_FADE_TIME / ENV.FPS);
  // }

  // draw the param.lives
  // if(param.lives > 0) {
  //   [...Array(param.lives)].forEach((_, index) => {
  //     const lifeColor = exploding && index == param.lives - 1 ? "red" : "white";
  //     drawPlayer(ENV.SHIP_SIZE + index * ENV.SHIP_SIZE * 1.2, ENV.SHIP_SIZE, 0.5 * Math.PI, 20, lifeColor);
  //   });
  // }

  // detect laser hits on enemy
  // let ax, ay, ar, lx, ly;
  // param.enemies.forEach((enemy, enemyIndex) => {
  //   // grab the enemy properties
  //   ax = enemy.x;
  //   ay = enemy.y;
  //   ar = enemy.r;

  //   // loop over the lasers
  //   playerLaserLoop();
  // });

  // // move the lasers
  // moveLaser();

  // // draw the enemy
  updateEnemy(getPlayer());


  // if(param.player.dead) {
  //   pushGameMessage("GAME OVER", 1.0);
  // }
}
