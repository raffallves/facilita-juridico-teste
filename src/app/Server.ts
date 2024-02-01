import express, { Application } from 'express';
import cors from 'cors';
import ClientController from './controllers/ClientController';
import ClientService from '../services/ClientService';
import PostgresClientRepository from '../infra/postgresClientRepository';
import * as database from '../infra/database';

export default class Server {
    private readonly _app = express();
    private readonly _port;
    private constructor(port: Number) {
        this._port = port;
    }

    public static create(port = 3000): Server {
        return new Server(port);
    }

    public async init(): Promise<void> {
        this.setupExpress();
        await this.setupDatabase();
        this.setupControllers();
    }

    private setupExpress(): void {
        this._app.use(express.json());
        this._app.use(cors());
    }

    private setupControllers(): void {
        const clientController = ClientController.create(
            ClientService.create(
                PostgresClientRepository.create(database.connection)
            )
        );

        this._app.use(clientController.exposeRouter());
    }

    private async setupDatabase(): Promise<void> {
        try {
            await database.connect();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public start(): void {
        this._app.listen(this._port, () => {
            console.log(`Server listening on port: ${this._port}`);
        });
    }

    public close(): void {
        database.close();
    }

    public getApp(): Application {
        return this._app;
    }
}