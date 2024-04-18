export abstract class View {
    public abstract init(): Promise<void>;
    public abstract end(): void
    public abstract update(dt: number): void
}