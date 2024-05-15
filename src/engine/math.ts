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
     * @param m1 The first matrix to multiply
     * @param m2 The second matrix to multiply
     * @returns The product of the two matricies
     */
    public static multiply(m1: Matrix3, m2: Matrix3): Matrix3 {
        let a00 = m1.a0;
        let a01 = m1.a1;
        let a02 = m1.a2;
        let a10 = m1.b0;
        let a11 = m1.b1;
        let a12 = m1.b2;
        let a20 = m1.c0;
        let a21 = m1.c1;
        let a22 = m1.c2;
        let b00 = m2.a0;
        let b01 = m2.a1;
        let b02 = m2.a2;
        let b10 = m2.b0;
        let b11 = m2.b1;
        let b12 = m2.b2;
        let b20 = m2.c0;
        let b21 = m2.c1;
        let b22 = m2.c2;
    
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
     * Creates a matrix that transforms vectors by translating them by tx and ty
     * @param tx The amount to translate on the x-axis
     * @param ty The amount to translate on the y-axis
     * @returns The translation matrix
     */
    public static translation(tx: number, ty: number): Matrix3 {
        return new Matrix3([
            1, 0, 0,
            0, 1, 0,
            tx, ty, 1
        ]);
    }

    /**
     * Translates a given matrix by tx and ty
     * @param m The initial matrix to multiply the translation matrix by
     * @param tx The amount to translate on the x-axis
     * @param ty The amount to translate on the y-axis
     * @returns The translation matrix multiplied by the initial matrix
     */
    public static translate(m: Matrix3, tx: number, ty: number): Matrix3 {
        return Matrix3.multiply(m, Matrix3.translation(tx, ty));
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
     * Rotates a matrix by the specified angle
     * @param m The initial matrix
     * @param radians The angle to rotate the matrix by
     * @returns The rotation matrix multipled by the initial matrix
     */
    public static rotate(m: Matrix3, radians: number): Matrix3 {
        return Matrix3.multiply(m, Matrix3.rotation(radians));
    }

    /**
     * Creates a scaling matrix
     * @param sx The amount to scale the x-axis
     * @param sy The amount to scale the y-axis
     * @returns The scaling matrix
     */
    public static scaling(sx: number, sy: number): Matrix3 {
        return new Matrix3([
            sx, 0, 0,
            0, sy, 0,
            0, 0, 1
        ]);
    }

    /**
     * Scales a given matrix
     * @param m The initial matrix
     * @param sx The amount to scale the x-axis by
     * @param sy The amount to scale the y-axis by
     * @returns The scaling matrix multiplied by the initial matrix
     */
    public static scale(m: Matrix3, sx: number, sy: number): Matrix3 {
        return Matrix3.multiply(m, Matrix3.scaling(sx, sy));
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
     * @param a The matrix to multiply by
     * @param b The matrix to multiply by
     * @returns The b matrix multiplied by the a matrix
     */
    public static multiply(m1: Matrix4, m2: Matrix4): Matrix4 {
        let a00 = m1.a0;
        let a01 = m1.a1;
        let a02 = m1.a2;
        let a03 = m1.a3;
        let a10 = m1.b0;
        let a11 = m1.b1;
        let a12 = m1.b2;
        let a13 = m1.b3;
        let a20 = m1.c0;
        let a21 = m1.c1;
        let a22 = m1.c2;
        let a23 = m1.c3;
        let a30 = m1.d0;
        let a31 = m1.d1;
        let a32 = m1.d2;
        let a33 = m1.d3;

        let b00 = m2.a0;
        let b01 = m2.a1;
        let b02 = m2.a2;
        let b03 = m2.a3;
        let b10 = m2.b0;
        let b11 = m2.b1;
        let b12 = m2.b2;
        let b13 = m2.b3;
        let b20 = m2.c0;
        let b21 = m2.c1;
        let b22 = m2.c2;
        let b23 = m2.c3;
        let b30 = m2.d0;
        let b31 = m2.d1;
        let b32 = m2.d2;
        let b33 = m2.d3;

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
     * @param tx The amount to translate the x-axis by
     * @param ty The amount to translate the y-axis by
     * @param tz The amount to translate the z-axis by
     * @returns The translation matrix
     */
    public static translation(tx: number, ty: number, tz: number): Matrix4 {
        return new Matrix4([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            tx, ty, tz, 1,
        ]);
    }

    /**
     * Translates a matrix
     * @param m The initial matrix
     * @param tx The amount to translate along the x-axis
     * @param ty The amount to translate along the y-axis
     * @param tz The amount to translate along the z-axis
     * @returns The translate matrix multiplied by the 
     */
    public static translate(m: Matrix4, tx: number, ty: number, tz: number): Matrix4 {
        return Matrix4.multiply(m, Matrix4.translation(tx, ty, tz));
    }

    /**
     * Creates a matrix that rotates around the x-axis
     * @param radians The angle to rotate
     * @returns The x axis rotation matrix
     */
    public static xRotation(radians: number): Matrix4 {
        let c = Math.cos(radians);
        let s = Math.sin(radians);
        return new Matrix4([
            1, 0, 0, 0,
            0, c, s, 0,
            0, -s, c, 0,
            0, 0, 0, 1
        ]);
    }

    /**
     * Rotates a matrix along the x axis by a given angle 
     * @param m The initial matrix
     * @param radians The angle to rotate the matrix by
     * @returns The rotated matrix
     */
    public static rotateX(m: Matrix4, radians: number): Matrix4 {
        return Matrix4.multiply(m, Matrix4.xRotation(radians));
    }

    /**
     * Creates a matrix that rotates around the y-axis
     * @param radians The angle to rotate
     * @returns The y axis rotation matrix
     */
    public static yRotation(radians: number): Matrix4 {
        let c = Math.cos(radians);
        let s = Math.sin(radians);

        return new Matrix4([
            c, 0, -s, 0,
            0, 1, 0, 0,
            s, 0, c, 0,
            0, 0, 0, 1,
        ]);
    }

    /**
     * Rotates a matrix along the y axis by a given angle 
     * @param m The initial matrix
     * @param radians The angle to rotate the matrix by
     * @returns The rotated matrix
     */
    public static rotateY(m: Matrix4, radians: number): Matrix4 {
        return Matrix4.multiply(m, Matrix4.yRotation(radians));
    }

    /**
     * Creates a matrix that rotates around the z-axis
     * @param radians The angle to rotate
     * @returns The z axis rotation matrix
     */
    public static zRotation(radians: number): Matrix4 {
        let c = Math.cos(radians);
        let s = Math.sin(radians);

        return new Matrix4([
            c, s, 0, 0,
            -s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ]);
    }

    /**
     * Rotates a matrix along the z axis by a given angle 
     * @param m The initial matrix
     * @param radians The angle to rotate the matrix by
     * @returns The rotated matrix
     */
    public static rotateZ(m: Matrix4, radians: number): Matrix4 {
        return Matrix4.multiply(m, Matrix4.zRotation(radians));
    }

    /**
     * Creates a scaling matrix
     * @param sx The amount to scale the x-axis
     * @param sy The amount to scale the y-axis
     * @param sz The amount to scale the z-axis
     * @returns The scaling matrix
     */
    public static scaling(sx: number, sy: number, sz: number): Matrix4 {
        return new Matrix4([
            sx, 0, 0, 0,
            0, sy, 0, 0,
            0, 0, sz, 0,
            0, 0, 0, 1
        ]);
    }

    /**
     * Scales a matrix
     * @param m The initial matrix
     * @param sx The amount to scale the x-axis
     * @param sy The amount to scale the y-axis
     * @param sz The amount to scale the z-axis
     * @returns The scaling matrix multiplied by the initial matrix
     */
    public static scale(m: Matrix4, sx: number, sy: number, sz: number): Matrix4 {
        return Matrix4.multiply(m, Matrix4.scaling(sx, sy, sz));
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
     * Gets the inverse of a matrix
     * @param m The matrix to invert
     * @returns The inverse of the matrix
     */
    public static inverse(m: Matrix4): Matrix4 {
        let m00 = m.a0;
        let m01 = m.a1;
        let m02 = m.a2;
        let m03 = m.a3;
        let m10 = m.b0;
        let m11 = m.b1;
        let m12 = m.b2;
        let m13 = m.b3;
        let m20 = m.c0;
        let m21 = m.c1;
        let m22 = m.c2;
        let m23 = m.c3;
        let m30 = m.d0;
        let m31 = m.d1;
        let m32 = m.d2;
        let m33 = m.d3;
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

    public static transformVector(m: Matrix4, v: Vector3): Vector3 {
        return new Vector3([
            m.a0 * v.x + m.a1 * v.y + m.a2 * v.z + m.a3,
            m.b0 * v.x + m.b1 * v.y + m.b2 * v.z + m.b3,
            m.c0 * v.x + m.c1 * v.y + m.c2 * v.z + m.c3,
        ]);
    }

    public static lookAt(cameraPos: Vector3, target: Vector3, up: Vector3): Matrix4 {
        const z = Vector3.normalize(Vector3.subtract(cameraPos, target));
        const x = Vector3.normalize(Vector3.cross(up, z));
        const y = Vector3.normalize(Vector3.cross(z, x));
        
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

export class Vector3 {
    public x = 0;
    public y = 0;
    public z = 0;

    constructor();
    constructor(data: number[]);
    constructor(x: number, y: number, z: number);
    constructor(a?: number[] | number, b?: number, c?: number) {
        if (a === undefined) return;

        if (Array.isArray(a)) {
            this.x = a[0];
            this.y = a[1];
            this.z = a[2];
            return;
        }

        if (b === undefined || c === undefined) return;

        this.x = a;
        this.y = b;
        this.z = c;
    }

    /**
     * Returns the cross product of two vectors
     * @param a Vector a
     * @param b Vector b
     * @returns The cross product
     */
    public static cross(a: Vector3, b: Vector3): Vector3 {
        return new Vector3([a.y * b.z - a.z * b.y,
          a.z * b.x - a.x * b.z,
          a.x * b.y - a.y * b.x]);
    }

    public static add(a: Vector3, b: Vector3): Vector3 {
        return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    public static subtract(a: Vector3, b: Vector3): Vector3 {
        return new Vector3([a.x - b.x, a.y - b.y, a.z - b.z]);
    }

    public static normalize(v: Vector3): Vector3 {
        var length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
        // make sure we don't divide by 0.
        if (length > 0.00001) {
            return new Vector3([v.x / length, v.y / length, v.z / length]);
        } else {
            return new Vector3([0, 0, 0]);
        }
    }

    public static zero(): Vector3 {
        return new Vector3([0, 0, 0]);
    }
}

let currentID = 0;
export function generateID(): number {
    return currentID++;
}