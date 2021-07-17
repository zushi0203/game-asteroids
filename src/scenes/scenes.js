import {scenesGame} from "./scenesGame.js";
import {scenesInitGame} from "./scenesInitGame.js";

export const scenes = {
	"play": (game, scene) => {
		scenesGame(game)
	},
	"initPlay": (game, scene) => {
		scenesInitGame(game);
		scene.use("play");
	}
}
