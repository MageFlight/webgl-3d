import { Matrix4 } from "./math/matrix";
import { GameObject, Node3 } from "./objects/gameObject";

export class Renderer {
    private vertexShaderSrc = `#version 300 es
    
    in vec4 inPosition;
    in vec4 inColor;
    
    out vec4 v_color;

    uniform mat4 viewProjection;
    uniform mat4 worldMatrix;
    
    void main() {
        gl_Position = viewProjection * worldMatrix * inPosition;

        v_color = inColor;
    }`;
    private fragmentShaderSrc = `#version 300 es
    
    precision highp float;

    in vec4 v_color;

    out vec4 outColor;
    
    void main() {
        outColor = v_color;
    }`;

    private _canvas: HTMLCanvasElement;
    private _gl: WebGL2RenderingContext;

    private _program: WebGLProgram;

    public static activeCamera: Camera | null;

    private vaoCache: Map<BufferData, WebGLVertexArrayObject> = new Map();

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        const context = canvas.getContext('webgl2');
        if (!context) throw new Error("WebGL 2 is not supported in this browser.");
        
        this._gl = context;

        this._program = this.createProgram();
        this._gl.useProgram(this._program);
    }

    public drawTree(tree: GameObject[]) {
        this.reszieCanvas();
        this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);
        this._gl.clearColor(0, 0, 0, 0);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);

        this._gl.enable(this._gl.DEPTH_TEST);
        this._gl.enable(this._gl.CULL_FACE);

        let viewMatrix = Matrix4.identity();

        if (Renderer.activeCamera) {
            viewMatrix = Renderer.activeCamera.transform.inverse();
        }

        const aspect = this._canvas.clientWidth / this._canvas.clientHeight;
        const projection = Matrix4.perspective(70 * Math.PI / 180, aspect, 1, 2000);

        const viewProjection = projection.multiply(viewMatrix);

        const viewProjectionLocation = this._gl.getUniformLocation(this._program, "viewProjection");
        this._gl.uniformMatrix4fv(viewProjectionLocation, false, viewProjection.toArray());

        for (let i = 0; i < tree.length; i++) {
            this.drawObject(tree[i], Matrix4.identity());
        }
    }

    private drawObject(object: GameObject, parentTransform: Matrix4) {
        let transform = parentTransform;
        if (object instanceof Node3) {
            transform = parentTransform.multiply(object.transform);
        }

        if (object instanceof Renderable) {
            const matrixLocation = this._gl.getUniformLocation(this._program, "worldMatrix");
            this._gl.uniformMatrix4fv(matrixLocation, false, transform.toArray());

            this.setUniforms(object.uniformData);

            this._gl.bindVertexArray(this.getVAO(object.bufferData));

            // TODO: Fix checking length
            this._gl.drawArrays(this._gl.TRIANGLES, 0, object.bufferData.get("inPosition")!.data.length / 3);
        }
    }

    private getVAO(data: BufferData): WebGLVertexArrayObject {
        // TODO: Not having a way to remove unused buffer data info from the map might cause performance issues
        //       or excess memory usage.

        let vao: WebGLVertexArrayObject | undefined | null = this.vaoCache.get(data);
        if (vao) return vao;

        vao = this._gl.createVertexArray();
        if (vao === null) throw new Error("Could not create VAO");
        this._gl.bindVertexArray(vao);

        for (const attrib of data) {
            const location = this._gl.getAttribLocation(this._program, attrib[0]);
            
            const buffer = this._gl.createBuffer();
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffer);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(attrib[1].data), this._gl.STATIC_DRAW);
            
            this._gl.enableVertexAttribArray(location);
            this._gl.vertexAttribPointer(location, attrib[1].numComponents, this._gl.FLOAT, false, 0, 0);
        }

        this._gl.bindVertexArray(null);

        this.vaoCache.set(data, vao);
        return vao;
    }

    private setUniforms(uniforms: Map<string, UniformInfo>) {
        for (const uniform of uniforms) {
            const location = this._gl.getUniformLocation(this._program, uniform[0]);
            const info = uniform[1];
            if (info.isMatrix) {
                switch (info.dimension) {
                    case 2:
                        this._gl.uniformMatrix2fv(location, false, info.data);
                        break;
                    case 3:
                        this._gl.uniformMatrix3fv(location, false, info.data);
                        break;
                    case 4:
                        this._gl.uniformMatrix4fv(location, false, info.data);
                        break;
                }
            } else {
                switch (info.dimension) {
                    case 1:
                        this._gl.uniform1fv(location, info.data);
                        break;
                    case 2:
                        this._gl.uniform2fv(location, info.data);
                        break;
                    case 3:
                        this._gl.uniform3fv(location, info.data);
                        break;
                    case 4:
                        this._gl.uniform4fv(location, info.data);
                        break;
                                
                }
            }
        }
    }

    private createProgram() {
        const vertexShader = this.compileShader(this._gl.VERTEX_SHADER, this.vertexShaderSrc);
        const fragmentShader = this.compileShader(this._gl.FRAGMENT_SHADER, this.fragmentShaderSrc);

        const program = this._gl.createProgram();
        if (!program) throw new Error("Could not create program");

        this._gl.attachShader(program, vertexShader);
        this._gl.attachShader(program, fragmentShader);
        this._gl.linkProgram(program);

        if (this._gl.getProgramParameter(program, this._gl.LINK_STATUS)) {
            return program;
        }

        const errorLog = this._gl.getProgramInfoLog(program);
        this._gl.deleteProgram(program);
        throw new Error("Error linking program: " + errorLog);
    }

    private compileShader(type: number, source: string): WebGLShader {
        const shader = this._gl.createShader(type);
        if (!shader) throw new Error("Could not create shader");
        this._gl.shaderSource(shader, source);
        this._gl.compileShader(shader);

        if (this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS)) {
            return shader;
        }

        const errorLog = this._gl.getShaderInfoLog(shader);
        this._gl.deleteShader(shader);
        throw new Error("Error compiling shader: " + errorLog);
    }

    private reszieCanvas(): void {
        const width  = this._canvas.clientWidth;
        const height = this._canvas.clientHeight;
        if (this._canvas.width === width && this._canvas.height === height) return;

        this._canvas.width  = width;
        this._canvas.height = height;
    }
}

export class Renderable extends Node3 {
    public bufferData: BufferData = new Map();
    public uniformData: Map<string, UniformInfo> = new Map();


    constructor(name?: string);
    constructor(bufferData: BufferData, uniformData: Map<string, UniformInfo>, name?:string);
    constructor(a?: BufferData | string, uniformData?: Map<string, UniformInfo>, name?:string) {
        super(typeof a === "string" ? a : name);

        if (a && typeof a !== "string") {
            this.bufferData = a;
        }
        if (uniformData !== undefined) {
            this.uniformData = uniformData;
        }
    }

    public update(dt: number): void {}
    public async load(): Promise<void> {}
}

export class Camera extends Node3 {
    constructor(name?: string) {
        super(name);

        Renderer.activeCamera = this;
    }
}

export type BufferData = Map<string, AttribInfo>;
export type AttribInfo = { numComponents: number, data: number[] };
export type UniformInfo = { dimension: number, isMatrix: boolean, data: number[] };