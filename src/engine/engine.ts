import { KeyboardHandler } from "./input";
import { View } from "./view";

export class Engine {
    private _nextView: View | null = null;
    private _currentView: View | null = null;
    private _previousTime: number = -1;
    private _numPromises = 0;

    private _keyboardHandler = KeyboardHandler.instance;

    constructor(view?: View) {
        if (!view) return;

        this._currentView = view;
    }

    public setView(view: View): void {
        this._nextView = view;
    }

    public currentView(): View | null {
        return this._currentView;
    }

    public start(): void {
        requestAnimationFrame(time => this.frame(time));
    }

    public syncPromise(promise: Promise<void>) {
        this._numPromises++;

        promise.then(() => this._numPromises--).catch(e => alert(e));
    }

    private frame(currentTime: number) {
        try {
            requestAnimationFrame(time => this.frame(time));
            let dt = 0;

            if (this._previousTime != -1) {
                dt = currentTime - this._previousTime;
            }
            this._previousTime = currentTime;

            if (this._nextView !== null) {
                this._currentView = this._nextView;
                this._nextView = null;
            }

            this._keyboardHandler.update();

            if (!this._currentView || this._numPromises > 0) return;

            this._currentView.update(dt);
        } catch (e: any) {
            alert(e.stack);
        }
    }
}