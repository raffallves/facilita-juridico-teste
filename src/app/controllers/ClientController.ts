import Controller from "./Controller";
import ClientService from "../../services/ClientService";
import { Request, Response, Router } from 'express';
import TSPAlgorithm from "../../services/TSPAlgorithm";


export default class ClientController extends Controller {
    private readonly _clientService: ClientService;
    private constructor(service: ClientService) {
        super();
        this._clientService = service;
        this.router.get('/clientes', this.getAllClients.bind(this));
        this.router.get('/clientes/:id', this.getClientById.bind(this));
        this.router.post('/clientes', this.createClient.bind(this));
        this.router.post('/algo', this.doTheAlgo.bind(this));
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
        const id: string = req.params.id.toString();
        try {
            const data = await this._clientService.getClientById(id);
            res.status(200).send(data);
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    public async createClient(req: Request, res: Response): Promise<void> {

        const name: string = req.body.name;
        const email: string = req.body.email;
        const phone: string = req.body.phone;
        const location: { x: number, y: number} = {
            x: parseInt(req.body.location.x),
            y: parseInt(req.body.location.y)
        }

        try {
            await this._clientService.createClient(name, email, phone, location);
            res.status(201).send('Cliente cadastrado com sucesso.');
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    public doTheAlgo(req: Request, res: Response): void {
        try {
            const data = req.body;
            const algoResult = TSPAlgorithm.doTSP(data);
            res.status(200).send(algoResult);
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }
}