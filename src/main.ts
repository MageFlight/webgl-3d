import { Engine } from "./engine/engine";
import { GameView } from "./game/game";

const engine = new Engine();

const gameView = new GameView(engine);

engine.syncPromise(gameView.init());
engine.setView(gameView);
engine.start();