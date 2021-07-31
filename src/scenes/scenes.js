import {sceneGame} from "./sceneGame/sceneGame.js";
import {sceneInitGame} from "./sceneInitGame/sceneInitGame.js";
import {isPlayerDead} from "../components/Player/Player";
import {sceneGameover} from "./sceneGameover/sceneGameover";
import {sceneDebugPlayer} from "./sceneDebugPlayer/sceneDebugPlayer";

export const scenes = {
	"initGame": (game, scene) => {
		sceneInitGame(game.gameState);
		// scene.use("debugPlayer");
		scene.use("game");
	},
	"game": (game, scene) => {
		sceneGame(game)
	},
	"gameover": (game, scene) => {
		sceneGameover(game.gameState)
	},
	"debugPlayer": (game, scene) => {
		sceneDebugPlayer(game.gameState)
	},
}
