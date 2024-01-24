import axios from 'axios';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IArrival } from 'src/content/applications/Arrivals/arrival.types';

export default function useArrivalDetails() {
  const { arrival_id } = useParams();
  const [arrival, setArrival] = useState<IArrival>({
    arrival_id: 0,
    airport_id: 0,
    terminal: "",
    scheduled_time: "",
  });

  const fetchArrivalData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/arrival/${arrival_id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const arrivalData = response.data.data;
      setArrival(arrivalData);
    } catch (error) {
      console.log("error > ", error);
    }
  }, [arrival_id]);

  return {
    arrival,
    fetchArrivalData
  };
}
