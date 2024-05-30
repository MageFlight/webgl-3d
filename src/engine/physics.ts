import { Vector3 } from "./math/vector";
import { GameObject } from "./objects/gameObject";
import { AABB, PhysicsBody, StaticBody } from "./objects/physicsObject";

export class PhysicsEngine {
    private tree: GameObject[];

    constructor(objectTree: GameObject[]) {
        this.tree = objectTree;
    }

    public rectangleCast(collider: AABB, velocity: Vector3) {
        const globalPos = collider.globalTransform.origin;
        const broadBox = new AABB(
            globalPos.add(velocity.multiply(0.5)),
            collider.extents.add(velocity.abs())
        );
        let options: PhysicsBody[] = [];
        // alert(JSON.stringify(globalPos) + "broadbox: " + JSON.stringify(broadBox));
        const check = (obj: GameObject) => {
            if (!(obj instanceof PhysicsBody) || obj === collider.parent) return;
            // alert("checking " + obj.name);

            if (PhysicsEngine.intersecting(broadBox, obj.collider)) {
                // alert("found");
                options.push(obj);
            }

            obj.children.forEach(check);
        }
        this.tree.forEach(check);
        // alert("options " + options.length);
        return this.sweepObjects(collider, options, velocity);
    }

    public static intersecting(a: AABB, b: AABB): boolean {
        const aGlobal = a.globalTransform.origin;
        const bGlobal = b.globalTransform.origin;

        return (
            aGlobal.x + a.extents.x > bGlobal.x - b.extents.x &&
            aGlobal.x - a.extents.x < bGlobal.x + b.extents.x &&
            aGlobal.y + a.extents.y > bGlobal.y - b.extents.y &&
            aGlobal.y - a.extents.y < bGlobal.y + b.extents.y &&
            aGlobal.z + a.extents.z > bGlobal.z - b.extents.z &&
            aGlobal.z - a.extents.z < bGlobal.z + b.extents.z
        );
    }

    private sweepObjects(collider: AABB, objects: PhysicsBody[], velocity: Vector3): number {
        for (const obj of objects) {
            if (obj instanceof StaticBody && obj.collider !== undefined && obj.collider !== collider) {
                const time = this.sweepAABB(collider, obj.collider, velocity);
                if (time !== -1) return time;
            }
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
        // alert("entrytimes: " + JSON.stringify(entryTime) + " " + JSON.stringify(exitTime));
        // alert("longestEntry: " + longestEntry);
        // alert("shortestExit: " + shortestExit);
        // alert("times: " + (entryTime.x > 1) + " " + (entryTime.y > 1) + " " + (entryTime.z > 1));
        // alert("eachaxis: " + (entryTime.x > exitTime.x) + " " + (entryTime.y > exitTime.y) + " " + (entryTime.z > exitTime.z));
        // alert((longestEntry > shortestExit) + " " + (entryTime.x < 0 && entryTime.y < 0 && entryTime.z < 0) + " " + (entryTime.x > 1 && entryTime.y > 1 && entryTime.z > 1));

        if (longestEntry > shortestExit || (entryTime.x < 0 && entryTime.y < 0 && entryTime.z < 0) || (entryTime.x > 1 && entryTime.y > 1 && entryTime.z > 1)) {
            return -1;
        }

        // alert("passed checks");

        return longestEntry;
    }
}