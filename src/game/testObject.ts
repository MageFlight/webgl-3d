
import { AttribInfo, Renderable, Renderer } from "../engine/renderer";
import model from '../../assets/models/bottle.obj?raw';
import { Vector3 } from "../engine/math/vector";

export class TestObject extends Renderable {
    constructor() {
        super();
        
        // this.bufferData = new Map<string, AttribInfo>([
        //     [
        //         "inPosition",
        //         {numComponents: 3, data: [
        //             -1, 1, 1,
        //             -1, -1, 1,
        //             1, 1, 1,

        //             1, 1, 1,
        //             -1, -1, 1,
        //             1, -1, 1,

        //             -1, 1, -1,
        //             -1, 1, 1,
        //             1, 1, -1,

        //             1, 1, -1,
        //             -1, 1, 1,
        //             1, 1, 1,

        //             1, 1, -1,
        //             1, 1, 1,
        //             1, -1, 1,

        //             1, 1, -1,
        //             1, -1, 1,
        //             1, -1, -1,

        //             -1, 1, 1,
        //             -1, 1, -1,
        //             -1, -1, -1,

        //             -1, 1, 1,
        //             -1, -1, -1,
        //             -1, -1, 1,

        //             -1, 1, -1,
        //             1, 1, -1,
        //             1, -1, -1,

        //             -1, 1, -1,
        //             1, -1, -1,
        //             -1, -1, -1,

        //             -1, -1, 1,
        //             1, -1, -1,
        //             1, -1, 1,
                    
        //             -1, -1, 1,
        //             -1, -1, -1,
        //             1, -1, -1
        //         ]},
        //     ],
        //     [
        //         "inColor",
        //         {numComponents: 3, data: [
        //             1, 0, 0,
        //             1, 0, 0,
        //             1, 0, 0,
                    
        //             1, 0, 0,
        //             1, 0, 0,
        //             1, 0, 0,

        //             0, 1, 0,
        //             0, 1, 0,
        //             0, 1, 0,

        //             0, 1, 0,
        //             0, 1, 0,
        //             0, 1, 0,

        //             0, 0, 1,
        //             0, 0, 1,
        //             0, 0, 1,
                    
        //             0, 0, 1,
        //             0, 0, 1,
        //             0, 0, 1,

        //             1, 1, 0,
        //             1, 1, 0,
        //             1, 1, 0,

        //             1, 1, 0,
        //             1, 1, 0,
        //             1, 1, 0,

        //             0, 1, 1,
        //             0, 1, 1,
        //             0, 1, 1,

        //             0, 1, 1,
        //             0, 1, 1,
        //             0, 1, 1,

        //             1, 0, 1,
        //             1, 0, 1,
        //             1, 0, 1,

        //             1, 0, 1,
        //             1, 0, 1,
        //             1, 0, 1,
        //         ]}
        //     ]
        // ]);

        this.bufferData = Renderer.parseOBJ(model);
        this.transform.basis = this.transform.basis.scaled(new Vector3(10, 10, 10));
        alert("basis: " + JSON.stringify(this.transform.basis));
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