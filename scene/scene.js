import {scenePlay} from "./scenePlay.js";
import {sceneInitPlay} from "./sceneInitPlay.js";

export const scene = {
	"play": (game, scene) => {
		scenePlay(game)
	},
	"initPlay": (game, scene) => {
		sceneInitPlay(game);
		scene.use("play");
	}
}
