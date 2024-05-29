import { Vector3 } from "./math/vector";
import { GameObject } from "./objects/gameObject";
import { AABB, StaticBody } from "./objects/physicsObject";

export class PhysicsEngine {
    private tree: GameObject[];

    constructor(objectTree: GameObject[]) {
        this.tree = objectTree;
    }

    public rectangleCast(collider: AABB, velocity: Vector3) {
        return this.sweepObject(collider, this.tree, velocity);
    }

    private sweepObject(collider: AABB, objects: GameObject[], velocity: Vector3): number {
        for (const child of objects) {
            if (child instanceof StaticBody && child.collider !== undefined) {
                const time =  this.sweepAABB(collider, child.collider, velocity);
                if (time !== -1) return time;
            }

            const time = this.sweepObject(collider, child.children, velocity);
            if (time !== -1) return time;
        }

        return 1;
    }

    private sweepAABB(a: AABB, b: AABB, velocity: Vector3): number {
        const aOrigin = a.globalTransform.origin;
        const bOrigin = b.globalTransform.origin;
        let entryDist = new Vector3();
        let exitDist = new Vector3();

        if (velocity.x > 0) {
            entryDist.x = (bOrigin.x - b.extents.x) - (aOrigin.x + a.extents.x);
            exitDist.x = (bOrigin.x + b.extents.x) - (aOrigin.x - a.extents.x);
        } else {
            entryDist.x = (bOrigin.x + b.extents.x) - (aOrigin.x - a.extents.x);
            exitDist.x = (bOrigin.x - b.extents.x) - (aOrigin.x + a.extents.x);
        }
        if (velocity.y > 0) {
            entryDist.y = (bOrigin.y - b.extents.y) - (aOrigin.y + a.extents.y);
            exitDist.y = (bOrigin.y + b.extents.y) - (aOrigin.y - a.extents.y);
        } else {
            entryDist.y = (bOrigin.y + b.extents.y) - (aOrigin.y - a.extents.y);
            exitDist.y = (bOrigin.y - b.extents.y) - (aOrigin.y + a.extents.y);
        }
        if (velocity.z > 0) {
            entryDist.z = (bOrigin.z - b.extents.z) - (aOrigin.z + a.extents.z);
            exitDist.z = (bOrigin.z + b.extents.z) - (aOrigin.z - a.extents.z);
        } else {
            entryDist.z = (bOrigin.z + b.extents.z) - (aOrigin.z - a.extents.z);
            exitDist.z = (bOrigin.z - b.extents.z) - (aOrigin.z + a.extents.z);
        }

        let entryTime = new Vector3();
        let exitTime = new Vector3();

        if (velocity.x == 0) {
            entryTime.x = -Infinity;
            exitTime.x = Infinity;
        } else {
            entryTime.x = entryDist.x / velocity.x;
            exitTime.x = exitDist.x / velocity.x;
        }
        if (velocity.y == 0) {
            entryTime.y = -Infinity;
            exitTime.y = Infinity;
        } else {
            entryTime.y = entryDist.y / velocity.y;
            exitTime.y = exitDist.y / velocity.y;
        }
        if (velocity.z == 0) {
            entryTime.z = -Infinity;
            exitTime.z = Infinity;
        } else {
            entryTime.z = entryDist.z / velocity.z;
            exitTime.z = exitDist.z / velocity.z;
        }

        const longestEntry = Math.max(...entryTime.toArray());
        const shortestExit = Math.min(...exitTime.toArray());

        if (longestEntry < shortestExit || (entryTime.x < 0 && entryTime.y < 0 && entryTime.z < 0) || ((entryTime.x > 1 && entryTime.y > 1 && entryTime.z > 1))) {
            return -1;
        }

        return longestEntry;
    }
}