import axios from 'axios';
import { FormEvent, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ITicket } from 'src/content/applications/Tickets/ticket.types';

export default function useTicketForm() {
    const { ticket_id } = useParams();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState<ITicket>({
        ticket_id: 0,
        flight_id: 0,
        ticket_type: "",
        ticket_amount: 0,
        fare_amount: "",
        valid_until: "",
    });
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

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
            const ticketData = response.data.data[0];
            console.log(ticketData);
            setFormValues(ticketData);
        } catch (error) {
            console.log("error > ", error);
        }
    }, [ticket_id]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoadingSubmit(true);

            const { ticket_id, ...payload } = formValues;

            console.log("Payload >>>", payload);

            await axios.post(`${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/ticket/`, payload, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });

            navigate("/management/tickets");
        } catch (error) {
            console.log('error > ', error);
        } finally {
            setLoadingSubmit(false);
        }
    };


    const handleUpdateSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoadingSubmit(true);
            const payload = {
                ...formValues
            };
            console.log("Payload >>>", payload);

            await axios.put(`${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/ticket/${ticket_id}`, payload, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });
            navigate("/management/tickets");
        } catch (error) {
            console.log('error > ', error);
        } finally {
            setLoadingSubmit(false);
        }
    };

    return {
        formValues,
        loadingSubmit,
        fetchTicketData,
        handleSubmit,
        handleUpdateSubmit,
        setFormValues
    };
}
