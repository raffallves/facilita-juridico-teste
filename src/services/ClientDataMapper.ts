import Client from "../domain/client/Client";
import { QueryResultRow } from "pg";
import { Point } from "../domain/client/ClientLocation";

export interface ClientDTO {
    id: string,
    name: string,
    email: string,
    phone: string,
    location: Point
}

export default class ClientDataMapper {
    public static toDomain(entry: QueryResultRow): Client {
        return Client.create(
            entry.nome, 
            entry.email, 
            entry.telefone, 
            entry.local, 
            entry.id
        );
    }

    public static toDTO(instance: Client): ClientDTO {
        return {
            id: instance.getId().getValue(),
            name: instance.getName(),
            email: instance.getEmail(),
            phone: instance.getPhone(),
            location: instance.getLocation()
        }
    }
}