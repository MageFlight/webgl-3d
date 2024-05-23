export class Vector3 {
    public x = 0;
    public y = 0;
    public z = 0;

    constructor();
    constructor(x: number, y: number, z: number);
    constructor(a?: number, b?: number, c?: number) {
        if (a === undefined || b === undefined || c === undefined) return;

        this.x = a;
        this.y = b;
        this.z = c;
    }

    /**
     * Returns the cross product of two vectors
     * @param right The other vector
     * @returns The cross product
     */
    public cross(right: Vector3): Vector3 {
        return new Vector3(
            this.y * right.z - this.z * right.y,
            this.z * right.x - this.x * right.z,
            this.x * right.y - this.y * right.x
        );
    }

    public add(right: Vector3): Vector3 {
        return new Vector3(this.x + right.x, this.y + right.y, this.z + right.z);
    }

    public subtract(right: Vector3): Vector3 {
        return new Vector3(this.x - right.x, this.y - right.y, this.z - right.z);
    }

    public multiply(right: Vector3 | number): Vector3 {
        if (right instanceof Vector3) return new Vector3(this.x * right.x, this.y * right.y, this.z * right.z);
        
        return new Vector3(this.x * right, this.y * right, this.z * right);
    }

    public static normalize(v: Vector3): Vector3 {
        var length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
        // make sure we don't divide by 0.
        if (length > 0.00001) {
            return new Vector3(v.x / length, v.y / length, v.z / length);
        } else {
            return Vector3.zero();
        }
    }

    public static zero(): Vector3 {
        return new Vector3(0, 0, 0);
    }

    public static up(): Vector3 {
        return new Vector3(0, 1, 0);
    }

    public static down(): Vector3 {
        return new Vector3(0, -1, 0);
    }

    public clone() {
        return new Vector3(this.x, this.y, this.z);
    }

    public dot(other: Vector3) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    public equals(other: Vector3) {
        return this.x === other.x && this.y === other.y && this.z === other.z;
    }

    public toArray() {
        return [this.x, this.y, this.z];
    }
}

export class Vector2 {
    public x;
    public y;
  
    /**
     * Creates a new Vector2 from two numbers
     * @param {number} x Initial x-value of the vector
     * @param {number} y Initial y-value of the vector
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
  
    /**
     * Returns a zero vector: a vector with all components set to 0
     * @returns A new Zero vector2
     */
    static zero() {
        return new Vector2(0, 0);
    }
  
    /**
     * Creates a new one vector: a vector with all components set to 1
     * @returns A new one vector2
     */
    static one() {
        return new Vector2(1, 1);
    }
  
    /**
     * Creates a new normalized vector that is pointing upwards.
     * @returns A new Vector with components of 0 and -1.
     */
    static up() {
        return new Vector2(0, -1);
    }
  
    /**
     * Creates a new normalized vector that is pointing downwards.
     * @returns A new Vector with components of 0 and 1.
     */
    static down() {
        return new Vector2(0, 1);
    }
  
    /**
     * Creates a new normalized vector that is pointing left.
     * @returns A new Vector with components of -1 and 0.
     */
    static left() {
        return new Vector2(-1, 0);
    }
  
    /**
     * Creates a new normalized vector that is pointing upwards.
     * @returns A new Vector with components of 1 and 0.
     */
    static right() {
        return new Vector2(1, 0);
    }
  
    /**
     * Adds this vector to another vector.
     * @param {Vector2} right Vector to add
     * @returns The resulting vector.
     */
    add(right: Vector2) {
        return new Vector2(this.x + right.x, this.y + right.y);
    }
  
    /**
     * Subtracts another vector from this vector (this - another)
     * @param {Vector2} right The vector subtracting with
     * @returns The resulting vector.
     */
    subtract(right: Vector2) {
        return new Vector2(this.x - right.x, this.y - right.y);
    }
  
    /**
     * Multiplies the x-component and the y-component by a scalar.
     * @param {number} n The scalar value to multiply both components by
     * @returns The resulting vector.
     */
    multiply(n: number): Vector2;
    multiply(vec: Vector2): Vector2;
  
    multiply(n: number | Vector2) {
        if (n instanceof Vector2) {
            return new Vector2(this.x * n.x, this.y * n.y);
        } else {
            return new Vector2(this.x * n, this.y * n);
        }
    }
  
    /**
     * Divides the x and y components by a divisor.
     * @param {Number} n The number to divide this vector by
     * @returns The resulting vector.
     */
    divide(n: number) {
        return new Vector2(this.x / n, this.y / n);
    }
  
    abs(): Vector2 {
        return new Vector2(Math.abs(this.x), Math.abs(this.y));
    }
  
    mod(n: number): Vector2 {
        return new Vector2(this.x % n, this.y % n);
    }
  
    swapComponents(): Vector2 {
        return new Vector2(this.y, this.x);
    }
  
    normalize(): Vector2 {
        let length = this.x * this.x + this.y * this.y;
        if (length > 0) {
            length = Math.sqrt(length);
            const inverseLength = 1.0 / length;
            return new Vector2(this.x * inverseLength, this.y * inverseLength);
        } else {
            return new Vector2(1, 0);
        }
    }
  
    sign(): Vector2 {
        return new Vector2(Math.sign(this.x), Math.sign(this.y));
    }
  
    /**
     * Creates a clone of this vector
     * @returns The clone of this vector
     */
    clone() {
        return new Vector2(this.x, this.y);
    }
  
    length(): number {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
  
    lengthSquared(): number {
        return (this.x * this.x) + (this.y * this.y);
    }
  
    /**
     * Checks if this vector is equal to another vector.
     * @param {Vector2} vector2 The vector to be compared to.
     * @returns The result of the comparison.
     */
    equals(vector2: Vector2) {
        return this.x == vector2.x && this.y == vector2.y;
    }
}