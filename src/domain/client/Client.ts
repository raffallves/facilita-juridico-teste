import Entity from "../commons/Entity";
import ClientId from "./ClientId";
import ClientLocation, { Point } from "./ClientLocation";

export default class Client extends Entity {
    private _name: string;
    private _email: string;
    private _phone: string;
    private _location: ClientLocation;

    protected constructor(
        id: ClientId, 
        name: string, 
        email: string, 
        phone: string, 
        location: ClientLocation
        ) {
        super(id);
        this._name = name;
        this._email = email;
        this._phone = phone;
        this._location = location;
    }

    public static create(
        name: string,
        email: string,
        phone: string,
        location: Point,
        id?: string
        ): Client {

        if (!this.validateEmail(email)) throw new Error('Formato de email inválido.'); 
        if (!this.validatePhoneNumber(phone)) throw new Error('Formato de telefone inválido.');

        const uuid = ClientId.create(id);
        const clientLocation = ClientLocation.create(location);
        return new Client(uuid, name.toLocaleLowerCase(), email, phone, clientLocation);
    }

    private static validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    private static validatePhoneNumber(phoneNumber: string): boolean {
        // Regular expression for a basic phone number validation (Brazilian format)
        const phoneRegex = /^\(?(?:\d{2})\)?[- ]?(?:\d{4,5})[- ]?(?:\d{4})$/;
        return phoneRegex.test(phoneNumber);
    }

    public getId(): ClientId {
        return this.getId();
    }

    public getName(): string {
        return this._name;
    }

    public getEmail(): string {
        return this._email;
    }

    public getPhone(): string {
        return this._phone;
    }

    public getLocation(): Point {
        return this._location.getValue();
    }
    
}