import UUID from "../commons/UUID";

export default class ClientId extends UUID {
    private constructor(uuid: string) {
        super(uuid);
    }

    public static create(id?: string): ClientId {
        const newId = super.create(id).getValue();
        return new ClientId(newId);
    }
}