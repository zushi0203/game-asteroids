import './style.css'

import * as ENV from "./env.js";
import {GameManager} from "./GameManager.js";

const game = new GameManager();

// initialize the timer variables and start the animation
let fpsInterval, now, then, elapsed;

/**
 *
 */
const animate = () => {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        game.render();
    }
}

/**
 *
 * @param fps
 */
const startAnimating = (fps) => {
    fpsInterval = 1000 / fps;
    then = Date.now();
    animate();
}

//
startAnimating(30);