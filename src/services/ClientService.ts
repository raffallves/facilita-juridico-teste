import Client from "../domain/client/Client";
import { Point } from "../domain/client/ClientLocation";
import IClientRepository from "../domain/client/IClientRepository";
import ClientDataMapper, { ClientDTO } from "./ClientDataMapper";


export default class ClientService {
    private readonly _repository: IClientRepository;

    private constructor(repository: IClientRepository) {
        this._repository = repository;
    }

    public static create(repository: IClientRepository): ClientService {
        return new ClientService(repository);
    }

    public async createClient(name: string, email: string, phone: string, location: Point): Promise<void> {
        const newClient = Client.create(name, email, phone, location);
        await this._repository.save(newClient);
    }

    public async getAllClients(): Promise<ClientDTO[] | []> {
        const clients: Client[] | null = await this._repository.getAll()
        return clients?.map(client => ClientDataMapper.toDTO(client)) || [];
    }

    public async getClientById(id: string): Promise<ClientDTO | []> {
        const client: Client | null = await this._repository.getOne(id);

        if (!client) {
            return []
        }
        return ClientDataMapper.toDTO(client);
    }
}