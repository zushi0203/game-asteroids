import {GameConsts} from "../common/consts/GameConsts"
import {SceneManager} from "./SceneManager";
import {scenes} from "../scenes/scenes";
import {Player} from "../components/Player/Player";
import {EnemiesType} from "../common/types/EnemiesType";


const initGameState = {
  level: 1,
  enemies: [],
  lives: GameConsts.LIVES,
  player: new Player(),
}

/**
 * ゲーム全体を管理するクラスです
 */
export class GameManager {
  gameState: {
    level: number;
    enemies: EnemiesType;
    lives: number;
    player: Player;
  };
  sceneManager: SceneManager;
  gameManager: GameManager;

  debugOptions: any;

  /**
   *
   */
  constructor() {
    this.gameState = {...initGameState}
    this.sceneManager = new SceneManager();
    this.gameManager = this;
    this.debugOptions = {};

    // シーンのセットアップ
    this.sceneManager.init();
    this.setupAllScene();
    this.init();
  }

  // ライフの減少
  reduceLives() {
    this.gameState.lives--;
  }
  // レベルアップ
  levelUp() {
    this.gameState.level++;
  }
  // ゲームオーバー
  isGameover() {
    return this.gameState.lives <= 0;
  }
  // ステージクリアの判定
  isStageClear() {
    return !this.isGameover() && !this.gameState.enemies.length;
  }

  /**
   * 初期化時の初期値を設定します
   */
  init() {
    this.initState();
    this.sceneManager.use("initGame");
    // this.sceneManager.use("debugInitGame");
  }

  /**
   * ステータス情報の初期値を設定します
   */
  initState() {
    this.gameState = {
      ...initGameState, 
      enemies: [...initGameState.enemies],
    };
  }

  /**
   * デバッグ用のメソッド
   */
  debugMethod() {
    return {
      god: () => {
        this.debugOptions.god = true;
      },
      isGod: () => {
        return this.debugOptions.god;
      },
      killEnemy: () => {
        this.gameState.enemies.shift();
      },
      killAllEnemy: () => {
        this.gameState.enemies = [];
      },
    }
  }

  /**
   * 敵配列の情報を更新します
   * @param newEnemies
   */
  updateEnemies(newEnemies: EnemiesType) {
    this.gameState.enemies = newEnemies;
  }

  /**
   * 全てのシーンをセットアップします
   */
  setupAllScene() {
    Object.keys(scenes).forEach((key) => {
      this.sceneManager.add(key, () => {
        scenes[key](this.gameManager, this.sceneManager);
      });
    })
  }

  /**
   * ゲームのレンダリングを行います
   */
  render() {
    this.sceneManager.update();
  }
};