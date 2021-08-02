import {isPlayerDead} from "../components/Player/Player";
import {sceneTitle} from "./sceneTitle/sceneTitle";
import {sceneInitGame} from "./sceneInitGame/sceneInitGame";
import {sceneGame} from "./sceneGame/sceneGame";
import {sceneGameStageUp} from "./sceneGameStageUp/sceneGameStageUp";
import {sceneGameover} from "./sceneGameover/sceneGameover";
import {sceneDebugPlayer} from "./sceneDebugPlayer/sceneDebugPlayer";

export const scenes = {
	"title": (game, scene) => {
		sceneTitle(game);
		scene.use("title");
	},
	"initGame": (game, scene) => {
		sceneInitGame(game);
		scene.use("game");
	},
	"game": (game, scene) => {
		sceneGame(game, scene); // シーン状況によって次のシーンを変更
	},
	"gameStageUp": (game, scene) => {
		sceneGameStageUp(game);
		scene.use("game");
	},
	"gameover": (game, scene) => {
		sceneGameover(game, scene)
	},
	"debugPlayer": (game, scene) => {
		sceneDebugPlayer(game.gameState)
	},
}
