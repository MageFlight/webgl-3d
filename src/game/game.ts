import { Engine } from "../engine/engine";
import { KeyboardHandler, MouseHandeler } from "../engine/input";
import { Vector3 } from "../engine/math/vector";
import { GameObject } from "../engine/objects/gameObject";
import { AABB, PhysicsBody, StaticBody } from "../engine/objects/physicsObject";
import { PhysicsEngine } from "../engine/physics";
import { Renderable, Renderer } from "../engine/renderer";
import { View } from "../engine/view";
import { Player } from "./testObject";
import model from '../../assets/models/cube.obj?raw';
import floorMaterials from '../../assets/models/floor.mtl?raw';


export class GameView extends View {
    private _objects: GameObject[] = [];
    private _engine: Engine;
    private _renderer: Renderer;

    private _keyboard = KeyboardHandler.instance;
    private _mouse = MouseHandeler.instance;

    private _physics: PhysicsEngine;

    constructor(engine: Engine, canvas: HTMLCanvasElement) {
        super();

        this._engine = engine;

        const floor = new StaticBody(new AABB(Vector3.zero(), new Vector3(40, 1, 40)), "floor");
        floor.transform.origin = new Vector3(0, 0, 0);

        const floorModel = new Renderable();
        floorModel.bufferData = Renderer.parseOBJ(model, Renderer.parseMTL(floorMaterials));
        floorModel.transform.basis = floorModel.transform.basis.scaled(floor.collider.extents);
        floorModel.parent = floor;

        this._objects.push(new Player(), floor);

        this._renderer = new Renderer(canvas);
        this._physics = new PhysicsEngine(this._objects);
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

        for (let i = 0; i < this._objects.length; i++) {
            const obj = this._objects[i];
            if (obj instanceof PhysicsBody) {
                obj.physicsUpdate(this._physics, dt);
            }
        }

        this._renderer.drawTree(this._objects);
    }

    private updateObject(obj: GameObject, dt: number) {
        obj.update(dt);

        obj.children.forEach(child => this.updateObject(child, dt));
    }
}