import { Matrix4, Vector3 } from "./engine/math";

const vertexShaderSrc = `#version 300 es

in vec4 inPosition;
in vec4 inColor;

out vec4 v_color;

uniform mat4 matrix;

void main() {
  gl_Position = matrix * inPosition;

  v_color = inColor;
}`;

const fragmentShaderSrc = `#version 300 es

precision highp float;

in vec4 v_color;

out vec4 outColor;

void main() {
  outColor = v_color;
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

  const posAttribLocation = gl.getAttribLocation(program, "inPosition");
  const colorAttribLocation = gl.getAttribLocation(program, "inColor");
  const positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
  const vao = gl.createVertexArray();
  if (!vao) throw new Error("VAO could not be created");
  gl.bindVertexArray(vao);

  gl.enableVertexAttribArray(posAttribLocation);
  setGeometry(gl);
  
  const size = 3; // 3 components per iteration
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get next point
  const offset = 0
  gl.vertexAttribPointer(posAttribLocation, size, type, normalize, stride, offset);

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  setColors(gl);

  gl.enableVertexAttribArray(colorAttribLocation);
  gl.vertexAttribPointer(colorAttribLocation, 3, gl.UNSIGNED_BYTE, true, 0, 0);

  gl.useProgram(program);

  gl.bindVertexArray(vao);

  drawScene(gl, program);
} catch (error) {
  alert(error);
}
}

let cameraAngle = 0;

function drawScene(gl: WebGL2RenderingContext, program: WebGLProgram) {
  if (!(gl.canvas instanceof HTMLCanvasElement) && gl.canvas) {
    return;
  }

  requestAnimationFrame(() => drawScene(gl, program));

  cameraAngle += 0.02;
  cameraAngle = cameraAngle % 360;

  const numObj = 5;
  const radius = 200;

  resizeCanvasToDisplaySize(gl.canvas);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Clear
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  
  const matrixLocation = gl.getUniformLocation(program, "matrix");

  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  let projectionMatrix = Matrix4.perspective(60 * Math.PI / 180, aspect, 1, 2000);

  const cameraX = Math.cos(cameraAngle) * radius * 1.75;
  const cameraZ = Math.sin(cameraAngle) * radius * 1.75;
  let cameraMatrix = Matrix4.zRotation(30 * Math.PI / 180);
  cameraMatrix = Matrix4.multiply(
    cameraMatrix,
    Matrix4.lookAt(
      new Vector3([cameraX, 0, cameraZ]),
      new Vector3([0, 0, 0]),
      new Vector3([0, 1, 0])
  ));

  const viewMatrix = Matrix4.inverse(cameraMatrix);
  const viewProjectionMatrix = Matrix4.multiply(projectionMatrix, viewMatrix);

  for (let i = 0; i < numObj; i++) {
    const angle = i * (Math.PI * 2 / numObj);

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    let worldMatrix = Matrix4.translation(x, 0, z);
    worldMatrix = Matrix4.rotateY(worldMatrix, -angle);

    const matrix = Matrix4.multiply(viewProjectionMatrix, worldMatrix);

    gl.uniformMatrix4fv(matrixLocation, false, matrix.toArray());

    gl.drawArrays(gl.TRIANGLES, 0, 16 * 6);
  }

  gl.drawArrays(gl.TRIANGLES, 0, 16 * 6);
}

function setGeometry(gl: WebGL2RenderingContext) {
  const positions = new Float32Array([
      // left column front
      0,   0,  0,
      0, 150,  0,
      30,   0,  0,
      0, 150,  0,
      30, 150,  0,
      30,   0,  0,

      // top rung front
      30,   0,  0,
      30,  30,  0,
      100,   0,  0,
      30,  30,  0,
      100,  30,  0,
      100,   0,  0,

      // middle rung front
      30,  60,  0,
      30,  90,  0,
      67,  60,  0,
      30,  90,  0,
      67,  90,  0,
      67,  60,  0,

      // left column back
        0,   0,  30,
      30,   0,  30,
        0, 150,  30,
        0, 150,  30,
      30,   0,  30,
      30, 150,  30,

      // top rung back
      30,   0,  30,
      100,   0,  30,
      30,  30,  30,
      30,  30,  30,
      100,   0,  30,
      100,  30,  30,

      // middle rung back
      30,  60,  30,
      67,  60,  30,
      30,  90,  30,
      30,  90,  30,
      67,  60,  30,
      67,  90,  30,

      // top
        0,   0,   0,
      100,   0,   0,
      100,   0,  30,
        0,   0,   0,
      100,   0,  30,
        0,   0,  30,

      // top rung right
      100,   0,   0,
      100,  30,   0,
      100,  30,  30,
      100,   0,   0,
      100,  30,  30,
      100,   0,  30,

      // under top rung
      30,   30,   0,
      30,   30,  30,
      100,  30,  30,
      30,   30,   0,
      100,  30,  30,
      100,  30,   0,

      // between top rung and middle
      30,   30,   0,
      30,   60,  30,
      30,   30,  30,
      30,   30,   0,
      30,   60,   0,
      30,   60,  30,

      // top of middle rung
      30,   60,   0,
      67,   60,  30,
      30,   60,  30,
      30,   60,   0,
      67,   60,   0,
      67,   60,  30,

      // right of middle rung
      67,   60,   0,
      67,   90,  30,
      67,   60,  30,
      67,   60,   0,
      67,   90,   0,
      67,   90,  30,

      // bottom of middle rung.
      30,   90,   0,
      30,   90,  30,
      67,   90,  30,
      30,   90,   0,
      67,   90,  30,
      67,   90,   0,

      // right of bottom
      30,   90,   0,
      30,  150,  30,
      30,   90,  30,
      30,   90,   0,
      30,  150,   0,
      30,  150,  30,

      // bottom
      0,   150,   0,
      0,   150,  30,
      30,  150,  30,
      0,   150,   0,
      30,  150,  30,
      30,  150,   0,

      // left side
      0,   0,   0,
      0,   0,  30,
      0, 150,  30,
      0,   0,   0,
      0, 150,  30,
      0, 150,   0,
  ]);

  // Center the F around the origin and Flip it around. We do this because
  // we're in 3D now with and +Y is up where as before when we started with 2D
  // we had +Y as down.

  // We could do by changing all the values above but I'm lazy.
  // We could also do it with a matrix at draw time but you should
  // never do stuff at draw time if you can do it at init time.
  var matrix = Matrix4.xRotation(Math.PI);
  matrix = Matrix4.translate(matrix, -50, -75, -15);

  for (var i = 0; i < positions.length; i += 3) {
    var vector = Matrix4.transformVector(matrix, new Vector3([positions[i + 0], positions[i + 1], positions[i + 2]]));
    positions[i + 0] = vector.x;
    positions[i + 1] = vector.y;
    positions[i + 2] = vector.z;
  }

  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
}

function setColors(gl: WebGL2RenderingContext) {
  gl.bufferData(
      gl.ARRAY_BUFFER,
      new Uint8Array([
          // left column front
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,

          // top rung front
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,

          // middle rung front
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,

          // left column back
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,

          // top rung back
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,

          // middle rung back
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,

          // top
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,

          // top rung right
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,

          // under top rung
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,

          // between top rung and middle
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,

          // top of middle rung
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,

          // right of middle rung
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,

          // bottom of middle rung.
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,

          // right of bottom
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,

          // bottom
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,

          // left side
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,
      ]),
      gl.STATIC_DRAW);
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