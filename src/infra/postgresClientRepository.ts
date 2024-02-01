import Client from "../domain/client/Client";
import IClientRepository from "../domain/client/IClientRepository";
import ClientDataMapper from "../services/ClientDataMapper";
import { ClientDTO } from "../services/ClientDataMapper";
import { Repository } from "../domain/commons/Repository";
import { PoolClient, QueryResult } from "pg";

export default class PostgresClientRepository extends Repository<Client> implements IClientRepository {
        private readonly _pool: PoolClient;

        private constructor(pool: PoolClient) {
            super();
            this._pool = pool;
        }

        public static create(pool: PoolClient): PostgresClientRepository {
            return new PostgresClientRepository(pool);
        }

        public async getAll(): Promise<Client[] | null> {
            try {
                const data: QueryResult<ClientDTO> = await this._pool.query('SELECT * FROM clientes');

                return data.rows.map(entry => {
                    return ClientDataMapper.toDomain(entry);
                });

            } catch (error: any) {
                throw new Error(error);
            }
        }

        public async getOne(id: string): Promise<Client | null> {
            try {
                const data: QueryResult<ClientDTO> = await this._pool.query(
                    'SELECT * FROM clientes WHERE id = 1::id', 
                    [id]
                );

                if (!data.rows.length) {
                    return null
                }

                return ClientDataMapper.toDomain(data.rows[0]);
            } catch (error: any) {
                throw new Error(error);
            }
        }

        public async save(data: Client): Promise<void> {
            throw new Error('Not implemented');
        }

}