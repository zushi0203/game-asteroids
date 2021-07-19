import * as ENV from "./env.js"
import {SceneManager} from "./SceneManager.js";
import {scenes} from "./scenes/scenes.js";
import {
  playerHandleClick,
  playerHandleKeyDown,
  playerHandleKeyup
} from "./components/Player/Player.js";

/**
 *
 */
export class GameManager {
  constructor() {
    this.state = {
      level: 1,
      enemies: [],
    }
    this.scene = new SceneManager();

    this.setupEventHandle();
    this.setupScene();
    this.init();
  }

  init() {
    this.state = {
      level: 1,
      enemies: [],
    }
    this.scene.use("initGame");
  }

  setupScene() {
    this.scene.init();
    Object.keys(scenes).forEach((key) => {
      this.scene.add(key, () => {
        scenes[key](this.state, this.scene);
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