export interface IRepository<Entity> {
    getAll(): Promise<Entity[] | null>;
    getOne(id: string): Promise<Entity | null>;
    save(data: Entity): Promise<void>;
}

export abstract class Repository<Entity> implements IRepository<Entity>{
    abstract getAll(): Promise<Entity[] | null>;
    abstract getOne(id: string): Promise<Entity | null>;
    abstract save(data: Entity): Promise<void>;
}