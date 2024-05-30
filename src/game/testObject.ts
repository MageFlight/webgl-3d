
import { AttribInfo, Renderable, Renderer } from "../engine/renderer";
import model from '../../assets/models/cube.obj?raw';
import materials from '../../assets/models/cube.mtl?raw';
import { Vector3 } from "../engine/math/vector";
import { AABB, CharacterBody } from "../engine/objects/physicsObject";
import { PhysicsEngine } from "../engine/physics";

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
    constructor() {
        super(new AABB(Vector3.zero(), new Vector3(1, 1, 1), "playerCollider"), "player");

        const display = new Renderable("playerDisplay");
        const material = Renderer.parseMTL(materials);
        display.bufferData = Renderer.parseOBJ(model, material);
        display.parent = this;
        this.velocity = new Vector3(0, -0.05, 0);
    }

    public physicsUpdate(physics: PhysicsEngine, dt: number): void {
        const time = physics.rectangleCast(this.collider, this.velocity);
        this.transform.origin = this.transform.origin.add(this.velocity.multiply(time));
        // alert("Collision is " + time);
        // alert("pos: " + JSON.stringify(this.transform.origin));
    }
}