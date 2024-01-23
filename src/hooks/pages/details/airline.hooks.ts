import axios from 'axios';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IAirline } from 'src/content/applications/Airlines/airline.types';

export default function useAirlineDetails() {
  const { airline_id } = useParams();
  const [airline, setAirline] = useState<IAirline>({
    airline_id: 0,
    name: "",
    iata: "",
    image: "",
  });

  const fetchAirlineData = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8060/api/airline/${airline_id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const airlineData = response.data.data;
      setAirline(airlineData);
    } catch (error) {
      console.log("error > ", error);
    }
  }, [airline_id]);

  return {
    airline,
    fetchAirlineData
  };
}
