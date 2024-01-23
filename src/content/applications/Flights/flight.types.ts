export interface IFlight {
  flight_id: number;
  departure_id: number;
  arrival_id: number;
  airline_id: number;
  transit: number;
  first_seat: number;
  business_seat: number;
  economy_seat: number;
  flight_status: string;
  flight_number: string;
  iata: string;
}