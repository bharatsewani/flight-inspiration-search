export class FlightSearchResult {
    constructor(origin: string, destination: string, departureDate: string,
        returnDate: string, price: string) {
        this.origin = origin;
        this.destination = destination;
        this.departureDate = departureDate;
        this.returnDate = returnDate;
        this.price = price;
    }
    origin: string;
    destination: string;
    departureDate: string;
    returnDate: string;
    price: string;
}