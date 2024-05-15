import { Engine } from "../engine/engine";
import { KeyboardHandler } from "../engine/input";
import { Matrix4 } from "../engine/math/matrix";
import { Vector3 } from "../engine/math/vector";
import { GameObject } from "../engine/objects/gameObject";
import { Camera, Renderer } from "../engine/renderer";
import { View } from "../engine/view";
import { TestObject } from "./testObject";

export class GameView extends View {
    private _objects: GameObject[] = [];
    private _engine: Engine;
    private _renderer: Renderer;

    private _keyboard = KeyboardHandler.instance;

    private _camera: Camera;
    private _cameraPos = new Vector3(0, 0, 5);
    private _cameraAngle = [0, 0];

    constructor(engine: Engine, canvas: HTMLCanvasElement) {
        super();

        this._engine = engine;
        this._camera = new Camera();
        this._camera.transform = Matrix4.lookAt(this._cameraPos, Vector3.zero(), Vector3.up());
        this._objects.push(new TestObject(), this._camera);

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
        let direction = Vector3.zero();
        if (this._keyboard.isKeyDown("KeyA")) direction.x -= 0.01 * dt;
        if (this._keyboard.isKeyDown("KeyD")) direction.x += 0.01 * dt;
        if (this._keyboard.isKeyDown("KeyW")) direction.z -= 0.01 * dt;
        if (this._keyboard.isKeyDown("KeyS")) direction.z += 0.01 * dt;
        if (this._keyboard.isKeyDown("ShiftLeft")) direction.y -= 0.01 * dt;
        if (this._keyboard.isKeyDown("Space")) direction.y += 0.01 * dt;

        const translationVector = Matrix4.rotation(new Vector3(0, 1, 0), -this._cameraAngle[0]).transformVector(direction)
        this._cameraPos = this._cameraPos.add(translationVector);
        this._camera.transform = Matrix4.translation(this._cameraPos);

        if (this._keyboard.isKeyDown("ArrowLeft")) {
            this._cameraAngle[0] -= Math.PI / 720 * dt;
        }
        if (this._keyboard.isKeyDown("ArrowRight")) {
            this._cameraAngle[0] += Math.PI / 720 * dt;
        }
        if (this._keyboard.isKeyDown("ArrowUp")) {
            this._cameraAngle[1] += Math.PI / 720 * dt;
        }
        if (this._keyboard.isKeyDown("ArrowDown")) {
            this._cameraAngle[1] -= Math.PI / 720 * dt;
        }

        this._camera.transform = this._camera.transform.rotated(new Vector3(0, 1, 0), this._cameraAngle[0]);
        this._camera.transform = this._camera.transform.rotated(new Vector3(1, 0, 0), this._cameraAngle[1]);

        for (let i = 0; i < this._objects.length; i++) {
            this.updateObject(this._objects[i], dt);
        }

        this._renderer.drawTree(this._objects);
    }

    private updateObject(obj: GameObject, dt: number) {
        obj.update(dt);

        obj.children.forEach(child => this.updateObject(child, dt));
    }
}