
import { AttribInfo, Camera, Renderable, Renderer } from "../engine/renderer";
import model from '../../assets/models/cube.obj?raw';
import materials from '../../assets/models/player.mtl?raw';
import { Vector2, Vector3 } from "../engine/math/vector";
import { AABB, CharacterBody } from "../engine/objects/physicsObject";
import { PhysicsEngine } from "../engine/physics";
import { KeyboardHandler, MouseHandeler } from "../engine/input";
import { Matrix4, Basis } from "../engine/math/matrix";

export class TestObject extends Renderable {
    constructor() {
        super();

        const parsedMaterials = Renderer.parseMTL(materials);
        this.bufferData = Renderer.parseOBJ(model, parsedMaterials);
    }

    public update(dt: number): void {
        // const framerate = dt;

        // const title = document.querySelector("title");
        // if (!title) return;
        // title.textContent = "FPS: " + Math.round(1000 / framerate);
    }
    public async load() {
        const response = await fetch('resources/models/cube/cube.obj');
        const text = await response.text();
        return;
    }

}

export class Player extends CharacterBody {
    private keyboard = KeyboardHandler.instance;
    private mouse = MouseHandeler.instance;

    private camera: Camera;
    private cameraAngle = Vector2.zero();

    constructor() {
        super(new AABB(Vector3.zero(), new Vector3(1, 1, 1), "playerCollider"), "player");
        this.transform.origin.y = 2;

        const display = new Renderable("playerDisplay");
        const material = Renderer.parseMTL(materials);
        display.bufferData = Renderer.parseOBJ(model, material);
        display.parent = this;

        this.camera = new Camera();
        this.camera.transform.origin = new Vector3(0, 1, 0);
        this.camera.parent = this;
    }

    public update(dt: number): void {
        let direction = Vector3.zero();
        if (this.keyboard.isKeyDown("KeyA")) direction.x -= 0.5;
        if (this.keyboard.isKeyDown("KeyD")) direction.x += 0.5;
        if (this.keyboard.isKeyDown("KeyW")) direction.z -= 0.5;
        if (this.keyboard.isKeyDown("KeyS")) direction.z += 0.5;

        let turnAmount = this.mouse.mouseDelta.multiply(Math.PI / 720);
        this.cameraAngle = this.cameraAngle.add(turnAmount);

        this.velocity = Matrix4.rotation(new Vector3(0, 1, 0), -this.cameraAngle.x).transformVector(direction);
        // this.velocity.y = -1;
        // this.transform.origin = this.transform.origin.add(translationVector);

        this.transform.basis = new Basis();
        this.transform.basis = this.transform.basis.rotated(new Vector3(0, 1, 0), this.cameraAngle.x);
        this.transform.basis = this.transform.basis.rotated(new Vector3(1, 0, 0), this.cameraAngle.y);
    }

    public physicsUpdate(physics: PhysicsEngine, dt: number): void {
        const time = physics.rectangleCast(this.collider, this.velocity);
        this.transform.origin = this.transform.origin.add(this.velocity.multiply(time));
        // alert("Collision is " + time);
        // alert("pos: " + JSON.stringify(this.transform.origin));
    }
}