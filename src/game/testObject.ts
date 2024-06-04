
import { Camera, Renderable, Renderer } from "../engine/renderer";
import model from '../../assets/models/cube.obj?raw';
import materials from '../../assets/models/player.mtl?raw';
import { Vector2, Vector3 } from "../engine/math/vector";
import { AABB, CharacterBody } from "../engine/objects/physicsObject";
import { PhysicsEngine } from "../engine/physics";
import { KeyboardHandler, MouseHandeler } from "../engine/input";
import { Matrix4, Basis } from "../engine/math/matrix";

export class Player extends CharacterBody {
    private keyboard = KeyboardHandler.instance;
    private mouse = MouseHandeler.instance;

    private camera: Camera;
    private cameraAngle = Vector2.zero();

    private readonly speed = 15;

    private readonly maxBounces = 5;
    private readonly skinWidth = 0.015; // Helps fix rounding errors

    constructor() {
        super(new AABB(Vector3.zero(), new Vector3(1, 2, 1), "playerCollider"), "player");
        this.transform.origin.y = 3;

        const display = new Renderable("playerDisplay");
        const material = Renderer.parseMTL(materials);
        display.bufferData = Renderer.parseOBJ(model, material);
        display.parent = this;

        this.camera = new Camera();
        this.camera.parent = this;
    }

    public update(dt: number): void {
        let direction = Vector3.zero();
        if (this.keyboard.isKeyDown("KeyA")) direction.x -= 1;
        if (this.keyboard.isKeyDown("KeyD")) direction.x += 1;
        if (this.keyboard.isKeyDown("KeyW")) direction.z -= 1;
        if (this.keyboard.isKeyDown("KeyS")) direction.z += 1;
        if (this.keyboard.keyJustReleased("Space")) this.velocity.y = 17;
        let movement = direction.normalized().multiply(this.speed);

        let turnAmount = this.mouse.mouseDelta.multiply(Math.PI / 720);
        this.cameraAngle = this.cameraAngle.add(turnAmount);

        let globalMovement = Matrix4.rotation(new Vector3(0, 1, 0), -this.cameraAngle.x).transformVector(movement);
        this.velocity.x = globalMovement.x;
        this.velocity.z = globalMovement.z;

        this.camera.transform.basis = new Basis();
        this.camera.transform.basis = this.camera.transform.basis.rotated(new Vector3(1, 0, 0), this.cameraAngle.y);
        this.camera.transform.basis = this.camera.transform.basis.rotated(new Vector3(0, 1, 0), this.cameraAngle.x);
    }

    public physicsUpdate(physics: PhysicsEngine, dt: number): void {
        this.velocity.y += -50 * dt;
        document.title = "" + this.velocity.y;

        this.velocity = this.collideAndSlide(physics, this.collider.globalTransform.origin, this.velocity.multiply(dt), 0);
        this.transform.origin = this.transform.origin.add(this.velocity);
        this.velocity = this.velocity.multiply(1 / dt);
    }

    private collideAndSlide(physics: PhysicsEngine, position: Vector3, velocity: Vector3, depth: number): Vector3 {
        if (depth > this.maxBounces) {
            return Vector3.zero();
        }

        const dist = velocity.length() + this.skinWidth;

        const collider = new AABB(position, this.collider.extents.subtract(this.skinWidth));
        const collision = physics.rectangleCast(collider, velocity.normalized().multiply(dist));

        if (!collision) return velocity;

        const snapToSurface = velocity.normalized().multiply(collision.distance.subtract(this.skinWidth));
        let leftover = velocity.subtract(snapToSurface);

        const magnitude = leftover.length();
        leftover = leftover.normalized().projectOnPlane(collision.normal);
        leftover = leftover.multiply(magnitude);

        return snapToSurface.add(this.collideAndSlide(physics, position.add(snapToSurface), leftover, depth + 1));
    }
}