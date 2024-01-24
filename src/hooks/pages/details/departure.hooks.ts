import axios from 'axios';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IDeparture } from 'src/content/applications/Departures/departure.types';

export default function useDepartureDetails() {
  const { departure_id } = useParams();
  const [departure, setDeparture] = useState<IDeparture>({
    departure_id: 0,
    airport_id: 0,
    terminal: "",
    scheduled_time: "",
  });

  const fetchDepartureData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/departure/${departure_id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const departureData = response.data.data;
      setDeparture(departureData);
    } catch (error) {
      console.log("error > ", error);
    }
  }, [departure_id]);

  return {
    departure,
    fetchDepartureData
  };
}
