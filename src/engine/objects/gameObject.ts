import { Matrix4, generateID } from "../math/matrix";

export class GameObject {
    public readonly name: string;
    public readonly id: number;
    protected _parent: GameObject | null = null;
    protected _children: GameObject[] = [];

    constructor(name?: string) {
        this.id = generateID();

        if (!name) {
            this.name = "GameObject" + this.id;
        } else {
            this.name = name;
        }
    }

    public update(dt: number): void {}
    public async load(): Promise<void> {}

    public get parent(): GameObject | null {
        return this._parent;
    }

    public set parent(newParent: GameObject) {
        if (this._parent) {
            // Remove the child refrence to this one from the parent
            this._parent._children.splice(this._parent._children.indexOf(this), 1);
        }

        this._parent = newParent;
        this._parent._children.push(this);
    }

    public get children(): GameObject[] {
        return [...this._children];
    }
}

export class Node3 extends GameObject {
    public transform: Matrix4 = Matrix4.identity();

    public update(dt: number): void {}
    public async load(): Promise<void> {}  
}