const numAccessorComponents: Map<string, number> = new Map([
    ["SCALAR", 1],
    ["VEC2", 2],
    ["VEC3", 3],
    ["VEC4", 4],
    ["MAT2", 4],
    ["MAT3", 9],
    ["MAT4", 16]
]);

const defaultColor = [1, 1, 0];

export function getNumComponents(accessorType: string) {
    const components = numAccessorComponents.get(accessorType);
    if (!components) throw new ReferenceError("No Key found for accessor type '" + accessorType + "'.");
    return components;
}

export async function loadGLTF(file: any) {
    file.buffers = file.buffers.map((buffer: any) => loadBinary(buffer.uri));
}

export function getAccessorAndBuffer(gl: WebGL2RenderingContext, file: any, accessorIndex: number) {
    const accessor = file.accessors[accessorIndex]
    const bufferView = file.bufferViews[accessor.bufferView];

    if (!bufferView.webglBuffer) {
        const buffer = gl.createBuffer();
        const target = bufferView.target || gl.ARRAY_BUFFER;
        const arrayBuffer = file.buffers[bufferView.buffer];
        const data = new Uint8Array(arrayBuffer, bufferView.byteOffset, bufferView.byteLength);

        gl.bindBuffer(target, buffer);
        gl.bufferData(target, data, gl.STATIC_DRAW);
        bufferView.webglBuffer = buffer;
    }

    return {
        accessor,
        buffer: bufferView.webglBuffer,
        stride: bufferView.stride || 0,
    };
}

export async function loadJSON(url: URL): Promise<Object> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Could not load " + url);
    }
    return await response.json();
}

export async function loadBinary(url: URL): Promise<ArrayBuffer> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Could not load " + url);
    }
    return await response.arrayBuffer();
}