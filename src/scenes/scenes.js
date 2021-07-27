import {sceneGame} from "./sceneGame/sceneGame.js";
import {sceneInitGame} from "./sceneInitGame/sceneInitGame.js";
import {isPlayerDead} from "../components/Player/Player";
import {sceneGameover} from "./sceneGameover/sceneGameover";
import {sceneDebugPlayer} from "./sceneDebugPlayer/sceneDebugPlayer";

export const scenes = {
	"initGame": (game, scene) => {
		sceneInitGame(game);
		// scene.use("debugPlayer");
		scene.use("game");
	},
	"game": (game, scene) => {
		if(isPlayerDead()) {
			scene.use("gameover");
		}
		sceneGame(game)
	},
	"gameover": (game, scene) => {
		sceneGameover(game)
	},
	"debugPlayer": (game, scene) => {
		sceneDebugPlayer(game)
	},
}
