import { randomUUID } from 'crypto';
import ValueObject from './ValueObject';

export default class UUID extends ValueObject<string> {
    protected constructor(uuid: string) {
        super(uuid);
    }

    public equals(uuid?: UUID): boolean {
        if (uuid == null || !(uuid instanceof UUID)) {
            return false;
        }

        return this.getValue() === uuid.getValue();
    }

    public static create(existingId?: string): UUID {
        if (existingId) {
            if (!UUID.isValidFormat(existingId)) {
                throw new Error('Failed to create Value Object. Invalid UUID format');
            }
            return new UUID(existingId);
        }
        const newId = randomUUID();
        return new UUID(newId);
    }

    public getValue(): string {
        return super.getValue();
    }

    public static isValidFormat(uuid: string): boolean {
        const uuidRegex = /^[0-9a-fA-F]{8}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{12}$/;
        return uuidRegex.test(uuid);
    }
}