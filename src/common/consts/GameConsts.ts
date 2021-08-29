// ドキュメントからcanvas要素の取得
const canvas = <HTMLCanvasElement>document.getElementById("gameCanvas");

/**
 * ゲーム設定の定数
 */
export const GameConsts = {
  FPS: 60, // FPSの最大値
  LIVES: 3, // デフォルトのライフ数
  CANVAS: canvas, // canvas要素
  CTX: canvas.getContext("2d")!, // getContext(2d)オブジェクトの呼び出し
} as const;
