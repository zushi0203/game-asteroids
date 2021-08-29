import './style.css'

import {GameManager} from "./core/GameManager";
import {GameConsts} from "./common/consts/GameConsts";

const game = new GameManager();

// initialize the timer variables and start the animation
let fpsInterval: number,
    now: number,
    then: number,
    elapsed: number;

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
const startAnimating = (fps: number) => {
    fpsInterval = 1000 / fps;
    then = Date.now();
    animate();
}

//
startAnimating(GameConsts.FPS);