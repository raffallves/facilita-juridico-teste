export default abstract class ValueObject<T> {
    protected readonly value: T;

    protected constructor(value: T) {
        this.value = value;
    }

    abstract equals(object?: ValueObject<T>): boolean;

    public getValue(): T {
        return this.value;
    }
}