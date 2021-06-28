import * as ENV from "./env.js"
import {SceneManager} from "./SceneManager.js";
import {scene} from "./scene/scene.js";
import {
  playerHandleKeyDown,
  playerHandleKeyup
} from "./components/player/player.js";

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
    this.scene.use("initPlay");
  }

  setupScene() {
    this.scene.init();
    Object.keys(scene).forEach((key) => {
      this.scene.add(key, () => {
        scene[key](this.state, this.scene);
      });
    })
  }

  setupEventHandle() {
    ENV.canvas.oncontextmenu = (ev) => {
      ev.preventDefault();
    }
    document.addEventListener("click", () => { console.log("click") });
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
  }

  render() {
    this.scene.update();
  }
};