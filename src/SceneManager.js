export class SceneManager {
  constructor() {
    this.scene = {};
    this.currentScene = null;
    this.currentSceneName = null;
    this.startTime = null;
    // 実行された現在のシーンをカウント
    this.countCurrentScenePerformed = null;
  }

  init() {
    this.scene = {};
    this.currentScene = null;
    this.startTime = null;
    this.countCurrentScenePerformed = null;
  }

  add(name, fn) {
    this.scene[name] = fn;
  }

  use(name) {
    // 有効なシーンでない場合、早期リターン
    const isValidScene = this.scene.hasOwnProperty(name);
    if(!isValidScene) return;

    // アクティブシーンにセット
    this.currentScene = this.scene[name];
    this.currentSceneName = name;

    this.startTime = Date.now();
    this.countCurrentScenePerformed = -1;
  }

  get getCurrentSceneName() {
    return this.currentSceneName;
  }

  update() {
    // const startTime = (Date.now() - this.startTime) / 1000;

    this.currentScene();
    ++this.countCurrentScenePerformed;
  }
}