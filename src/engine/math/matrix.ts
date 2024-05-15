import { Vector2, Vector3 } from "./vector";

export class Matrix3 {
    public a0 = 0;
    public a1 = 0;
    public a2 = 0;
    public b0 = 0;
    public b1 = 0;
    public b2 = 0;
    public c0 = 0;
    public c1 = 0;
    public c2 = 0;
    
    constructor(data?: number[]) {
        if (!data) return;

        this.a0 = data[0 * 3 + 0];
        this.a1 = data[0 * 3 + 1];
        this.a2 = data[0 * 3 + 2];
        this.b0 = data[1 * 3 + 0];
        this.b1 = data[1 * 3 + 1];
        this.b2 = data[1 * 3 + 2];
        this.c0 = data[2 * 3 + 0];
        this.c1 = data[2 * 3 + 1];
        this.c2 = data[2 * 3 + 2];
    }

    /**
     * Multiplies two 3x3 matricies together
     * @param right The matrix on the right of the equation
     * @returns The product of the two matricies
     */
    public multiply(right: Matrix3): Matrix3 {
        let a00 = this.a0;
        let a01 = this.a1;
        let a02 = this.a2;
        let a10 = this.b0;
        let a11 = this.b1;
        let a12 = this.b2;
        let a20 = this.c0;
        let a21 = this.c1;
        let a22 = this.c2;
        let b00 = right.a0;
        let b01 = right.a1;
        let b02 = right.a2;
        let b10 = right.b0;
        let b11 = right.b1;
        let b12 = right.b2;
        let b20 = right.c0;
        let b21 = right.c1;
        let b22 = right.c2;
    
        return new Matrix3([
            b00 * a00 + b01 * a10 + b02 * a20,
            b00 * a01 + b01 * a11 + b02 * a21,
            b00 * a02 + b01 * a12 + b02 * a22,
            b10 * a00 + b11 * a10 + b12 * a20,
            b10 * a01 + b11 * a11 + b12 * a21,
            b10 * a02 + b11 * a12 + b12 * a22,
            b20 * a00 + b21 * a10 + b22 * a20,
            b20 * a01 + b21 * a11 + b22 * a21,
            b20 * a02 + b21 * a12 + b22 * a22,
        ]);
    }

    /**
     * Creates a matrix that transforms vectors by translating them by a vector
     * @param vector The amount to translate on the y-axis
     * @returns The translation matrix
     */
    public static translation(vector: Vector2): Matrix3 {
        return new Matrix3([
            1, 0, 0,
            0, 1, 0,
            vector.x, vector.y, 1
        ]);
    }

    /**
     * Translates a given matrix by a vector
     * @param vector The amount to translate on the y-axis
     * @returns The translation matrix multiplied by the initial matrix
     */
    public translated(vector: Vector2): Matrix3 {
        return this.multiply(Matrix3.translation(vector));
    }

    /**
     * Creates a rotation matrix that transforms vectors by rotating them by the specified radians
     * @param radians The angle to make the rotation matrix for
     * @returns The rotation matrix
     */
    public static rotation(radians: number): Matrix3 {
        let c = Math.cos(radians);
        let s = Math.sin(radians);
        return new Matrix3([
            c, -s, 0,
            s, c, 0,
            0, 0, 1
        ]);
    }

    /**
     * Rotates this matrix by the specified angle
     * @param radians The angle to rotate by
     * @returns The rotation matrix multipled by this matrix
     */
    public rotated(radians: number): Matrix3 {
        return this.multiply(Matrix3.rotation(radians));
    }

    /**
     * Creates a scaling matrix
     * @param vector The amount to scale each axis
     * @returns The scaling matrix
     */
    public static scaling(vector: Vector2): Matrix3 {
        return new Matrix3([
            vector.x, 0, 0,
            0, vector.y, 0,
            0, 0, 1
        ]);
    }

    /**
     * Scales this matrix
     * @param vector The amount to scale each axis
     * @returns The scaling matrix multiplied by the initial matrix
     */
    public scaled(vector: Vector2): Matrix3 {
        return this.multiply(Matrix3.scaling(vector));
    }

    /**
     * Creates a new identity matrix
     * @returns The identity matrix
     */
    public static identity(): Matrix3 {
        return new Matrix3([
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ]);
    }

    /**
     * Creates a projection matrix that maps world space to pixel space
     * @param width The width of the screen
     * @param height The height of the screen
     * @returns The projection matrix
     */
    public static projection(width: number, height: number): Matrix3 {
        return new Matrix3([
            2 / width, 0, 0,
            0, -2 / height, 0,
            -1, 1, 1
        ]);
    }
}

export class Matrix4 {
    public a0 = 0;
    public a1 = 0;
    public a2 = 0;
    public a3 = 0;
    public b0 = 0;
    public b1 = 0;
    public b2 = 0;
    public b3 = 0;
    public c0 = 0;
    public c1 = 0;
    public c2 = 0;
    public c3 = 0;
    public d0 = 0;
    public d1 = 0;
    public d2 = 0;
    public d3 = 0;

    constructor(data?: number[]) {
        if (!data) return;

        this.a0 = data[0 * 4 + 0];
        this.a1 = data[0 * 4 + 1];
        this.a2 = data[0 * 4 + 2];
        this.a3 = data[0 * 4 + 3];
        this.b0 = data[1 * 4 + 0];
        this.b1 = data[1 * 4 + 1];
        this.b2 = data[1 * 4 + 2];
        this.b3 = data[1 * 4 + 3];
        this.c0 = data[2 * 4 + 0];
        this.c1 = data[2 * 4 + 1];
        this.c2 = data[2 * 4 + 2];
        this.c3 = data[2 * 4 + 3];
        this.d0 = data[3 * 4 + 0];
        this.d1 = data[3 * 4 + 1];
        this.d2 = data[3 * 4 + 2];
        this.d3 = data[3 * 4 + 3];
    }

    public toArray() {
        return [
            this.a0, this.a1, this.a2, this.a3,
            this.b0, this.b1, this.b2, this.b3,
            this.c0, this.c1, this.c2, this.c3,
            this.d0, this.d1, this.d2, this.d3,
        ];
    }

    /**
     * Multiples matrix b by matrix a
     * @param right The matrix on te right of the equation
     * @returns The b matrix multiplied by the a matrix
     */
    public multiply(right: Matrix4): Matrix4 {
        let a00 = this.a0;
        let a01 = this.a1;
        let a02 = this.a2;
        let a03 = this.a3;
        let a10 = this.b0;
        let a11 = this.b1;
        let a12 = this.b2;
        let a13 = this.b3;
        let a20 = this.c0;
        let a21 = this.c1;
        let a22 = this.c2;
        let a23 = this.c3;
        let a30 = this.d0;
        let a31 = this.d1;
        let a32 = this.d2;
        let a33 = this.d3;

        let b00 = right.a0;
        let b01 = right.a1;
        let b02 = right.a2;
        let b03 = right.a3;
        let b10 = right.b0;
        let b11 = right.b1;
        let b12 = right.b2;
        let b13 = right.b3;
        let b20 = right.c0;
        let b21 = right.c1;
        let b22 = right.c2;
        let b23 = right.c3;
        let b30 = right.d0;
        let b31 = right.d1;
        let b32 = right.d2;
        let b33 = right.d3;

        return new Matrix4([
            b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
            b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
            b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
            b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
            b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
            b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
            b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
            b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
            b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
            b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
            b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
            b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
            b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
            b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
            b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
            b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
        ]);
    }
    
    /**
     * Creates a new translation matrix
     * @param vector The amount to translate by
     * @returns The translation matrix
     */
    public static translation(vector: Vector3): Matrix4 {
        return new Matrix4([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            vector.x, vector.y, vector.z, 1,
        ]);
    }

    /**
     * Translates a matrix
     * @param vector The amount to translate the matrix
     * @returns The translate matrix multiplied by the 
     */
    public translated(vector: Vector3): Matrix4 {
        return this.multiply(Matrix4.translation(vector));
    }

    /**
     * Creates a matrix that rotates around an axis.
     * https://en.wikipedia.org/wiki/Rotation_matrix#Rotation_matrix_from_axis_and_angle
     * @param axis The axis to rotate around
     * @param angle The angle to rotate by
     */
    public static rotation(axis: Vector3, angle: number): Matrix4 {
        const c = Math.cos(angle);
        const s = Math.sin(angle);

        return new Matrix4([
            axis.x * axis.x + (1 - axis.x * axis.x) * c,  axis.x * axis.y * (1 - c) - axis.z * s,       axis.x * axis.z * (1 - c) + axis.y * s,       0,
            axis.y * axis.x * (1 - c) + axis.z * s,       axis.y * axis.y + (1 - axis.y * axis.y) * c,  axis.y * axis.z * (1 - c) - axis.x * s,       0,
            axis.z * axis.x * (1 - c) - axis.y * s,       axis.z * axis.y * (1 - c) + axis.x * s,       axis.z * axis.z + (1 - axis.z * axis.z) * c,  0,
            0, 0, 0, 1
        ]);
    }

    public rotated(axis: Vector3, angle: number): Matrix4 {
        return this.multiply(Matrix4.rotation(axis, angle));
    }

    public static xRotation(angle: number) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);

        return new Matrix4([
            1, 0, 0, 0,
            0, c, -s, 0,
            0, s, c, 0,
            0, 0, 0, 1
        ]);
    }

    /**
     * Creates a scaling matrix
     * @param vector The amount to scale each axis
     * @returns The scaling matrix
     */
    public static scaling(vector: Vector3): Matrix4 {
        return new Matrix4([
            vector.x, 0, 0, 0,
            0, vector.y, 0, 0,
            0, 0, vector.z, 0,
            0, 0, 0, 1
        ]);
    }

    /**
     * Scales a matrix
     * @param vector The amount to scale each axis
     * @returns The scaling matrix multiplied by the initial matrix
     */
    public scale(vector: Vector3): Matrix4 {
        return this.multiply(Matrix4.scaling(vector));
    }

    public static orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4 {
        return new Matrix4([
            2 / (right - left), 0, 0, 0,
            0, 2 / (top - bottom), 0, 0,
            0, 0, 2 / (near - far), 0,
       
            (left + right) / (left - right),
            (bottom + top) / (bottom - top),
            (near + far) / (near - far),
            1,
          ]);
    }

    public static perspective(fovRadians: number, aspect: number, near: number, far: number): Matrix4 {
        let f = Math.tan(Math.PI * 0.5 - 0.5 * fovRadians);
        let rangeInv = 1.0 / (near - far);

        return new Matrix4([
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (near + far) * rangeInv, -1,
            0, 0, near * far * rangeInv * 2, 0,
        ]);
    }

    /**
     * Gets the inverse of this matrix
     * @returns The inverse of the matrix
     */
    public inverse(): Matrix4 {
        let m00 = this.a0;
        let m01 = this.a1;
        let m02 = this.a2;
        let m03 = this.a3;
        let m10 = this.b0;
        let m11 = this.b1;
        let m12 = this.b2;
        let m13 = this.b3;
        let m20 = this.c0;
        let m21 = this.c1;
        let m22 = this.c2;
        let m23 = this.c3;
        let m30 = this.d0;
        let m31 = this.d1;
        let m32 = this.d2;
        let m33 = this.d3;
        let tmp_0  = m22 * m33;
        let tmp_1  = m32 * m23;
        let tmp_2  = m12 * m33;
        let tmp_3  = m32 * m13;
        let tmp_4  = m12 * m23;
        let tmp_5  = m22 * m13;
        let tmp_6  = m02 * m33;
        let tmp_7  = m32 * m03;
        let tmp_8  = m02 * m23;
        let tmp_9  = m22 * m03;
        let tmp_10 = m02 * m13;
        let tmp_11 = m12 * m03;
        let tmp_12 = m20 * m31;
        let tmp_13 = m30 * m21;
        let tmp_14 = m10 * m31;
        let tmp_15 = m30 * m11;
        let tmp_16 = m10 * m21;
        let tmp_17 = m20 * m11;
        let tmp_18 = m00 * m31;
        let tmp_19 = m30 * m01;
        let tmp_20 = m00 * m21;
        let tmp_21 = m20 * m01;
        let tmp_22 = m00 * m11;
        let tmp_23 = m10 * m01;

        let t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
                (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
        let t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
                (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
        let t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
                (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
        let t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
                (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

        let d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

        return new Matrix4([
            d * t0,
            d * t1,
            d * t2,
            d * t3,
            d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
                (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
            d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
                (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
            d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
                (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
            d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
                (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
            d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
                (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
            d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
                (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
            d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
                (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
            d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
                (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
            d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
                (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
            d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
                (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
            d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
                (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
            d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
                (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02)),
        ]);
    }

    public transformVector(v: Vector3): Vector3 {
        return new Vector3(
            this.a0 * v.x + this.a1 * v.y + this.a2 * v.z + this.a3,
            this.b0 * v.x + this.b1 * v.y + this.b2 * v.z + this.b3,
            this.c0 * v.x + this.c1 * v.y + this.c2 * v.z + this.c3,
        );
    }

    public static lookAt(cameraPos: Vector3, target: Vector3, up: Vector3): Matrix4 {
        const z = Vector3.normalize(cameraPos.subtract(target));
        const x = Vector3.normalize(up.cross(z));
        const y = Vector3.normalize(z.cross(x));
        
        return new Matrix4([
            x.x, x.y, x.z, 0,
            y.x, y.y, y.z, 0,
            z.x, z.y, z.z, 0,
            cameraPos.x, cameraPos.y, cameraPos.z, 1
        ]);
    }

    public static identity() {
        return new Matrix4([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    }
}

let currentID = 0;
export function generateID(): number {
    return currentID++;
}
