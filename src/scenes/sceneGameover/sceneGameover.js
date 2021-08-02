import { background } from "../../components/Background/Background";

export const sceneGameover = (game) => {
	background();

	// enemiesの更新
	game.gameState.enemies.forEach((enemy) => {
		enemy.update();
	})
	console.log("gameOver")
}
