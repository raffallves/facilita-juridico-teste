import { Pool, PoolClient } from "pg";

export let connection: PoolClient;

export const connect = async (): Promise<void> => {
    try {
        if (!process.env.PORT) {
            throw new Error('Database port must be provided.');
        }

        const pool = new Pool({
            host: process.env.HOST,
            database: process.env.DATABASE,
            user: process.env.USER,
            password: process.env.PASSWORD,
            port: parseInt(process.env.PORT)
        });
        
        connection = await pool.connect();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const close = (): void => {
    try {
        if (connection) {
            connection.release();
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}