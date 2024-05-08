import { GameObject } from "../engine/objects/gameObject";

export class TestObject extends GameObject {
    constructor() {
        super();
    }

    public update(dt: number): void {
        const framerate = dt;

        const title = document.querySelector("title");
        if (!title) return;
        title.textContent = "FPS: " + Math.round(1000 / framerate);
    }
    public async load() {
        return;
    }

}