import Controller from "./Controller";
import ClientService from "../../services/ClientService";
import { Request, Response, Router } from 'express';


export default class ClientController extends Controller {
    private readonly _clientService: ClientService;
    private constructor(service: ClientService) {
        super();
        this._clientService = service;
        this.router.get('/clientes', this.getAllClients.bind(this));
        this.router.get('/clientes/:id', this.getClientById.bind(this));
    }

    public exposeRouter(): Router {
        return this.router;
    }

    public static create(service: ClientService) {
        return new ClientController(service);
    }

    public async getAllClients(req: Request, res: Response): Promise<void> {

        try {
            const data = await this._clientService.getAllClients();
            res.status(200).send(data);
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    public async getClientById(req: Request, res: Response): Promise<void> {
        const id = req.body.id;
        try {
            const data = await this._clientService.getClientById(id);
            res.status(200).send(data);
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }
}