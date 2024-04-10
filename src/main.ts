import { Matrix4 } from "./math";

const vertexShaderSrc = `#version 300 es

in vec4 position;

uniform mat4 matrix;

void main() {
  gl_Position = matrix * position;
}`;

const fragmentShaderSrc = `#version 300 es

precision highp float;

out vec4 outColor;

uniform vec4 color;

void main() {
  outColor = color;
}`;

const canvas: HTMLCanvasElement | null = document.querySelector("canvas");

function start(): void {
  try {
  if (!canvas) throw new Error("Could not get canvas refrence");

  const gl: WebGL2RenderingContext | null | undefined = canvas.getContext("webgl2");

  if (!gl) {
    alert("No Webgl");
    return;
  }

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSrc);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);

  const program = createProgram(gl, vertexShader, fragmentShader);

  const posAttribLocation = gl.getAttribLocation(program, "position");
  const positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
  const vao = gl.createVertexArray();
  if (!vao) throw new Error("VAO could not be created");
  gl.bindVertexArray(vao);

  gl.enableVertexAttribArray(posAttribLocation);
  
  const size = 3; // 3 components per iteration
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get next point
  const offset = 0
  gl.vertexAttribPointer(posAttribLocation, size, type, normalize, stride, offset);

  resizeCanvasToDisplaySize(canvas);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Clear
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(program);

  gl.bindVertexArray(vao);

  drawScene(gl, program);
} catch (error) {
  alert(error);
}
}

function drawScene(gl: WebGL2RenderingContext, program: WebGLProgram) {
  const colorLocation = gl.getUniformLocation(program, "color");
  const matrixLocation = gl.getUniformLocation(program, "matrix");
  const translation = [0, 0, 0];
  const rotation = [0, 0, 0];
  const scale = [1, 1, 1];
  
  gl.uniform4f(colorLocation, 0, 0, 0, 1);

  if (!(gl.canvas instanceof HTMLCanvasElement) && gl.canvas) {
    return;
  }

  resizeCanvasToDisplaySize(gl.canvas);

  let matrix = Matrix4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 400);
  matrix = Matrix4.translate(matrix, translation[0], translation[1], translation[2]);
  matrix = Matrix4.rotateX(matrix, rotation[0]);
  matrix = Matrix4.rotateY(matrix, rotation[1]);
  matrix = Matrix4.rotateZ(matrix, rotation[2]);
  matrix = Matrix4.scale(matrix, scale[0], scale[1], scale[2])

  gl.uniformMatrix4fv(matrixLocation, false, matrix);
  alert("Matrix:" + JSON.stringify(matrix));

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    // left column
    0,   0,  0,
    30,   0,  0,
     0, 150,  0,
     0, 150,  0,
    30,   0,  0,
    30, 150,  0,

   // top rung
    30,   0,  0,
   100,   0,  0,
    30,  30,  0,
    30,  30,  0,
   100,   0,  0,
   100,  30,  0,

   // middle rung
    30,  60,  0,
    67,  60,  0,
    30,  90,  0,
    30,  90,  0,
    67,  60,  0,
    67,  90,  0,
  ]), gl.STATIC_DRAW);

  gl.drawArrays(gl.TRIANGLES, 0, 18);
}

function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error("Shader could not be created");
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader;
  }

  const errorLog = gl.getShaderInfoLog(shader);
  gl.deleteShader(shader);
  throw new Error("Error compiling shader: " + errorLog);
}

function createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
  const program = gl.createProgram();
  if (!program) throw new Error("Program could not be created");
  
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return program;
  }

  const errorLog = gl.getProgramInfoLog(program);
  gl.deleteProgram(program);
  throw new Error("Error linking program: " + errorLog);
}

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
  const width  = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (canvas.width !== width ||  canvas.height !== height) {
    canvas.width  = width;
    canvas.height = height;
    return true;
  }
  return false;
}

start();