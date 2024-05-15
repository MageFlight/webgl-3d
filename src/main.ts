import { Engine } from "./engine/engine";
import { GameView } from "./game/game";

const canvas = document.querySelector('canvas');
if (!canvas) throw new Error("Could not find canvas");
canvas.addEventListener("click", () => canvas.requestPointerLock());

const engine = new Engine();

const gameView = new GameView(engine, canvas);

engine.syncPromise(gameView.init());
engine.setView(gameView);
engine.start();