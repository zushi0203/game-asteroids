import {ScenesType} from "../scenes/types/ScenesType";

/**
 * シーンを管理するクラスです
 */
export class SceneManager {
  scenes: ScenesType;
  currentSceneName?: string;
  startTime?: number;
  countCurrentScenePerformed?: number;

  constructor() {
    this.scenes = {};
    // this.currentScene;
    this.currentSceneName;
    this.startTime;
    // 実行された現在のシーンをカウント
    this.countCurrentScenePerformed;
  }

  /**
   * scenesに該当のキーが存在するか判定
   * @param name
   */
  isValidSceneKey(name: string) {
    return this.scenes.hasOwnProperty(name);
  }

  /**
   * 初期化時の初期値を設定します
   */
  init() {
    this.scenes = {};
    // this.currentScene = undefined;
    this.startTime = undefined;
    this.countCurrentScenePerformed = undefined;
  }

  /**
   * scenesにシーンを追加します
   * @param name
   * @param fn
   */
  add(name: string, fn: Function) {
    this.scenes[name] = fn;
  }

  /**
   * scenesからシーンを取り出し、currentSceneNameに設定します
   * @param name
   */
  use(name: string) {
    console.log("use scene: ", name);
    // 有効なシーンでない場合、早期return
    if(!this.isValidSceneKey(name)) return;
    this.currentSceneName = name;

    this.startTime = Date.now();
    // this.countCurrentScenePerformed = -1;
  }

  /**
   * currentSceneNameに設定されているシーンを呼び出し、シーン情報を更新します
   */
  update() {
    // consts startTime = (Date.now() - this.startTime) / 1000;
    if(!this.currentSceneName || !this.isValidSceneKey(this.currentSceneName)) return;
    //
    this.scenes[this.currentSceneName]();
    // ++this.countCurrentScenePerformed;
  }
}