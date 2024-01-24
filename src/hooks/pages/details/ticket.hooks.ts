import axios from 'axios';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ITicket } from 'src/content/applications/Tickets/ticket.types';

export default function useTicketDetails() {
  const { ticket_id } = useParams();
  const [ticket, setTicket] = useState<ITicket>({
    ticket_id: 0,
    flight_id: 0,
    ticket_type: "",
    ticket_amount: 0,
    fare_amount: "",
    valid_until: "",
  });

  const fetchTicketData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/ticket/${ticket_id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const flightData = response.data.data[0];
      // console.log(flightData);
      setTicket(flightData);
    } catch (error) {
      console.log("error > ", error);
    }
  }, [ticket_id]);

  return {
    ticket,
    fetchTicketData
  };
}
