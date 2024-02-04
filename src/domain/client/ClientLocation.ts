import ValueObject from '../commons/ValueObject';

export interface Point {
    x: number,
    y: number
}

export default class ClientLocation extends ValueObject<Point> {
    private constructor(point: Point) {
        super(point);
    }

    public static create(point: Point): ClientLocation {
        return new ClientLocation(point);
    }

    public equals(object?: object): boolean {
        if (object == null || !(object instanceof ClientLocation)) {
            return false;
        }

        const current = super.getValue();
        const other = object.getValue();

        return (
            current.x === other.x &&
            current.y === other.y
        );
    }
}