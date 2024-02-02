import Client from "../domain/client/Client";
import IClientRepository from "../domain/client/IClientRepository";
import ClientDataMapper from "../services/ClientDataMapper";
import { ClientDTO } from "../services/ClientDataMapper";
import { Repository } from "../domain/commons/Repository";
import { Pool, PoolClient, QueryResult } from "pg";

export default class PostgresClientRepository extends Repository<Client> implements IClientRepository {
        private readonly _pool: Pool;

        private constructor(pool: Pool) {
            super();
            this._pool = pool;
        }

        public static create(pool: Pool): PostgresClientRepository {
            return new PostgresClientRepository(pool);
        }

        public async getAll(): Promise<Client[] | null> {
            const connection: PoolClient = await this._pool.connect();
            try {
                const data: QueryResult<ClientDTO> = await connection.query(
                    `SELECT clientes.id, nome, email, telefone, local FROM clientes
                    JOIN clientes_coordenadas ON clientes.id = clientes_coordenadas.cliente_id
                    JOIN coordenadas ON coordenadas.id = clientes_coordenadas.coordenada_id`
                );

                return data.rows.map(entry => {
                    return ClientDataMapper.toDomain(entry);
                });

            } catch (error: any) {
                throw error;
            } finally {
                connection.release();
            }
        }

        public async getOne(id: string): Promise<Client | null> {
            const connection: PoolClient = await this._pool.connect();
            try {
                const data: QueryResult<ClientDTO> = await connection.query(
                    `SELECT clientes.id, nome, email, telefone, local FROM clientes
                    JOIN clientes_coordenadas ON clientes.id = clientes_coordenadas.cliente_id
                    JOIN coordenadas ON coordenadas.id = clientes_coordenadas.coordenada_id
                    WHERE clientes.id = $1`, 
                    [id]
                );
                
                if (!data.rows.length) {
                    return null
                }

                return ClientDataMapper.toDomain(data.rows[0]);
            } catch (error: any) {
                throw error;
            } finally {
                connection.release();
            }
        }

        public async save(client: Client): Promise<void> {
            const data = ClientDataMapper.toDTO(client);
            const connection: PoolClient = await this._pool.connect();
            try {
                await connection.query('BEGIN');

                await connection.query(
                    'INSERT INTO clientes (id, nome, email, telefone) VALUES ($1, $2, $3, $4)',
                    [data.id, data.name, data.email, data.phone]
                );

                
                const locationInfo: QueryResult = await connection.query(
                    'INSERT INTO coordenadas (local) VALUES (point($1, $2)) RETURNING id',
                    [data.location.x, data.location.y]
                );
                const locationId: string = locationInfo.rows[0].id;


                await connection.query(
                    'INSERT INTO clientes_coordenadas (cliente_id, coordenada_id) VALUES ($1, $2)',
                    [data.id, locationId]
                );

                await connection.query('COMMIT');

            } catch (error: any) {
                await connection.query('ROLLBACK');
                throw error;
            } finally {
                connection.release();
            }
        }

}