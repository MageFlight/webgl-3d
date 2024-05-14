import { Engine } from "../engine/engine";
import { GameObject } from "../engine/objects/gameObject";
import { Renderer } from "../engine/renderer";
import { View } from "../engine/view";
import { TestObject } from "./testObject";

export class GameView extends View {
    private _objects: GameObject[] = [];
    private _engine: Engine;
    private _renderer: Renderer;

    constructor(engine: Engine, canvas: HTMLCanvasElement) {
        super();

        this._engine = engine;
        this._objects.push(new TestObject());

        this._renderer = new Renderer(canvas);
    }

    public async init(): Promise<void> {
        let promises: Promise<void>[] = [];
        for (let i = 0; i < this._objects.length; i++) {
            promises.push(this._objects[i].load());
        }

        await Promise.all(promises);
    }
    public end(): void {}
    public update(dt: number): void {
        for (let i = 0; i < this._objects.length; i++) {
            this.updateObject(this._objects[i], dt);
        }
    }

    private updateObject(obj: GameObject, dt: number) {
        obj.update(dt);

        obj.children.forEach(child => this.updateObject(child, dt));
    }
}