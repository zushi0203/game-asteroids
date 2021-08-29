import {sceneTitle} from "./sceneTitle/sceneTitle";
import {sceneInitGame} from "./sceneGame/sceneInitGame";
import {sceneGame} from "./sceneGame/sceneGame";
import {sceneGameStageUp} from "./sceneGame/sceneGameStageUp";
import {sceneGameover} from "./sceneGame/sceneGameover";
import {GameManager} from "../core/GameManager";
import {ScenesType} from "./types/ScenesType";
import {sceneDebugInitGame} from "./sceneDebug/sceneDebugInitGame";

export const scenes: ScenesType = {
	// ----------------------------------------
	// タイトル画面
  // ----------------------------------------

	"title": (gameManager: GameManager) => {
		sceneTitle();
		gameManager.sceneManager.use("title");
	},


	// ----------------------------------------
	// ゲーム内画面
	// ----------------------------------------

	"initGame": (gameManager: GameManager) => {
		sceneInitGame(gameManager);
		gameManager.sceneManager.use("game");
	},
	"game": (gameManager: GameManager) => {
		sceneGame(gameManager, "gameover", "gameStageUp"); // シーン状況によって次のシーンを変更
	},
	"gameStageUp": (gameManager: GameManager) => {
		sceneGameStageUp(gameManager);
		gameManager.sceneManager.use("game");
	},
	"gameover": (gameManager: GameManager) => {
		sceneGameover(gameManager)
	},


	// ----------------------------------------
	// 【デバッグ】ゲーム内画面
	// ----------------------------------------

	"debugInitGame": (gameManager: GameManager) => {
		sceneDebugInitGame(gameManager);
		gameManager.sceneManager.use("debugGame");
	},
	"debugGame": (gameManager: GameManager) => {
		sceneGame(gameManager, "gameover", "debugGameStageUp");
	},
	"debugGameStageUp": (gameManager: GameManager) => {
		sceneGameStageUp(gameManager);
		gameManager.sceneManager.use("debugGame");
	},
}
