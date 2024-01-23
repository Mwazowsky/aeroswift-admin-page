// import { IFileItem } from '../../../services/types';

export interface ICar {
  car_id: number;
  plate: string;
  manufacture: string;
  image: string;
  model: string;
  type: string;
  description: string;
  transmission: string;
  capacity: number;
  rentPerDay: string;
  availableAt: string;
  available: boolean;
  year: number;
  options: {
    optionsInputFields: {
      option: string;
    }[];
  };
  specs: {
    specsInputFields: {
      spec: string;
    }[];
  };
  created_at: string;
  updated_at: string | null;
  created_by: number;
  updated_by: number;
}

export interface IAirline {
  airline_id: number;
  name: string;
  iata: string;
  image: string;
}