import { AttribInfo, BufferData, Renderable } from "../engine/renderer";

export class TestObject extends Renderable {
    constructor() {
        super();
        
        // this.transform = this.transform.rotated(new Vector3(1, 0, 0), Math.PI / 4);
        this.bufferData = new Map<string, AttribInfo>([
            [
                "inPosition",
                {numComponents: 3, data: [
                    -1, 1, 1,
                    -1, -1, 1,
                    1, 1, 1,

                    1, 1, 1,
                    -1, -1, 1,
                    1, -1, 1,

                    -1, 1, -1,
                    -1, 1, 1,
                    1, 1, -1,

                    1, 1, -1,
                    -1, 1, 1,
                    1, 1, 1,

                    1, 1, -1,
                    1, 1, 1,
                    1, -1, 1,

                    1, 1, -1,
                    1, -1, 1,
                    1, -1, -1,

                    -1, 1, 1,
                    -1, 1, -1,
                    -1, -1, -1,

                    -1, 1, 1,
                    -1, -1, -1,
                    -1, -1, 1,

                    -1, 1, -1,
                    1, 1, -1,
                    1, -1, -1,

                    -1, 1, -1,
                    1, -1, -1,
                    -1, -1, -1,

                    -1, -1, 1,
                    1, -1, -1,
                    1, -1, 1,
                    
                    -1, -1, 1,
                    -1, -1, -1,
                    1, -1, -1
                ]},
            ],
            [
                "inColor",
                {numComponents: 3, data: [
                    1, 0, 0,
                    1, 0, 0,
                    1, 0, 0,
                    
                    1, 0, 0,
                    1, 0, 0,
                    1, 0, 0,

                    0, 1, 0,
                    0, 1, 0,
                    0, 1, 0,

                    0, 1, 0,
                    0, 1, 0,
                    0, 1, 0,

                    0, 0, 1,
                    0, 0, 1,
                    0, 0, 1,
                    
                    0, 0, 1,
                    0, 0, 1,
                    0, 0, 1,

                    1, 1, 0,
                    1, 1, 0,
                    1, 1, 0,

                    1, 1, 0,
                    1, 1, 0,
                    1, 1, 0,

                    0, 1, 1,
                    0, 1, 1,
                    0, 1, 1,

                    0, 1, 1,
                    0, 1, 1,
                    0, 1, 1,

                    1, 0, 1,
                    1, 0, 1,
                    1, 0, 1,

                    1, 0, 1,
                    1, 0, 1,
                    1, 0, 1,
                ]}
            ]
        ]);
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