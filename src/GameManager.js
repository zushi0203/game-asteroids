import * as ENV from "./env.js"
import {SceneManager} from "./SceneManager.js";
import {scenes} from "./scenes/scenes.js";
import {
  playerHandleClick,
  playerHandleKeyDown,
  playerHandleKeyup
} from "./components/Player/Player.js";


const initGameState = {
  level: 1,
  enemies: [],
  lives: ENV.GAME_LIVES,
}

/**
 *
 */
export class GameManager {
  constructor() {
    this.gameState = {...initGameState};
    this.scene = new SceneManager();

    this.setupEventHandle();
    this.setupScene();
    this.init();
  }

  init() {
    this.gameState = {...initGameState};
    this.scene.use("initGame");
  }

  setupScene() {
    this.scene.init();
    Object.keys(scenes).forEach((key) => {
      this.scene.add(key, () => {
        scenes[key](this.gameState, this.scene);
      });
    })
  }

  setupEventHandle() {
    document.addEventListener("keydown", (ev) => {
      console.log("keydown");
      if(ev.code == "KeyR") {
        this.init();
      }
      playerHandleKeyDown(ev);
    });
    document.addEventListener("keyup", (ev) => {
      playerHandleKeyup(ev);
    });
    ENV.canvas.addEventListener("click", (ev) => {
      ev.preventDefault();
      playerHandleClick(ev);
    });
    ENV.canvas.oncontextmenu = ("oncontextmenu", (ev) => {
      ev.preventDefault();
      playerHandleClick(ev);
    });
  }

  render() {
    this.scene.update();
  }
};