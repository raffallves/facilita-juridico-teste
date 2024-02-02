import { Pool } from "pg";

export let connection: Pool;

export const connect = async (): Promise<void> => {
    try {
        if (!process.env.PORT) {
            throw new Error('Database port must be provided.');
        }

        connection = new Pool({
            host: process.env.HOST,
            database: process.env.DATABASE,
            user: process.env.USER,
            password: process.env.PASSWORD,
            port: parseInt(process.env.PORT)
        });

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const close = (): void => {
    try {
        if (connection) {
            connection.end();
        }

    } catch (error) {
        console.error(error);
        throw error;
    }
}