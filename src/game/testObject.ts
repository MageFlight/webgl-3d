
import { AttribInfo, Renderable, Renderer } from "../engine/renderer";
import model from '../../assets/models/bottle.obj?raw';
import materials from '../../assets/models/bottle.mtl?raw';
import { Vector3 } from "../engine/math/vector";

export class TestObject extends Renderable {
    constructor() {
        super();

        const parsedMaterials = Renderer.parseMTL(materials);
        this.bufferData = Renderer.parseOBJ(model, parsedMaterials);
        this.transform.basis = this.transform.basis.scaled(new Vector3(20, 20, 20));
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