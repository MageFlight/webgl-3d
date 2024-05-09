import { GameObject } from "./objects/gameObject";

export class Renderer {
    private vertexShaderSrc = `#version 300 es
    
    in vec4 inPosition;
    in vec4 inColor;
    
    out vec4 v_color;

    uniform mat4 matrix;
    
    void main() {
        gl_Position = matrix * inPosition;

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

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        const context = canvas.getContext('webgl2');
        if (!context) throw new Error("WebGL 2 is not supported in this browser.");
        
        this._gl = context;

        this._program = this.createProgram();
    }

    public drawTree(tree: GameObject[]) {
    
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

export class Renderable extends GameObject {
    public bufferData = Map<string, attribInfo>;
    public uniformData = Map<string, uniformInfo>;


    constructor(name?: string);
    constructor(bufferData: Map<string, attribInfo>, uniformData: Map<string, uniformInfo>, name?:string);
    constructor(a?: Map<string, attribInfo> | string, uniformData?: Map<string, uniformInfo>, name?:string) {
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

export type attribInfo = { numComponents: number, data: number[] };
export type uniformInfo = { dimension: number, isMatrix: boolean, data: number[] };