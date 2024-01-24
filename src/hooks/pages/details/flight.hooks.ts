import axios from 'axios';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IFlight} from 'src/content/applications/Flights/flight.types';

export default function useFlightDetails() {
  const { flight_id } = useParams();
  const [flight, setFlight] = useState<IFlight>({
    flight_id: 0,
    departure_id: 0,
    arrival_id: 0,
    airline_id: 0,
    transit: 0,
    first_seat: 0,
    business_seat: 0,
    economy_seat: 0,
    flight_status: "",
    flight_number: "",
    iata: ""
  });

  const fetchFlightData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/flight/${flight_id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const flightData = response.data.data[0];
      // console.log(flightData);
      setFlight(flightData);
    } catch (error) {
      console.log("error > ", error);
    }
  }, [flight_id]);

  return {
    flight,
    fetchFlightData
  };
}
