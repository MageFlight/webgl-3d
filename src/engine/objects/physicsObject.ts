import { Vector3 } from "../math/vector";
import { PhysicsEngine } from "../physics";
import { Node3 } from "./gameObject";

export abstract class PhysicsBody extends Node3 {
    public collider: AABB;
    
    constructor(collider: AABB, name?: string) {
        super(name);

        this.collider = collider;
        collider.parent = this;
    }

    public abstract physicsUpdate(physics: PhysicsEngine, dt: number): void;
}

export class StaticBody extends PhysicsBody {
    constructor(collider: AABB, name?: string) {
        super(collider, name);
    }

    public physicsUpdate(physics: PhysicsEngine, dt: number): void {}
}

export class CharacterBody extends StaticBody {
    public velocity: Vector3 = new Vector3();

    constructor(collider: AABB, name?: string) {
        super(collider, name);
    }
}

export class AABB extends Node3 {
    public extents: Vector3 = new Vector3(1, 1, 1);

    constructor(origin: Vector3, extents: Vector3, name?: string) {
        super(name);
        this.transform.origin = origin;
        this.extents = extents;
    }
}