import axios from 'axios';
import { FormEvent, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IDeparture } from 'src/content/applications/Departures/departure.types';

export default function useDepartureForm() {
    const { departure_id } = useParams();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState<IDeparture>({
        departure_id: 0,
        airport_id: 0,
        terminal: "",
        scheduled_time: "",
    });
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

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
            setFormValues(departureData);
        } catch (error) {
            console.log("error > ", error);
        }
    }, [departure_id]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoadingSubmit(true);

            const { departure_id, ...payload } = formValues;

            console.log("Payload >>>", payload);

            await axios.post(`${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/departure/`, payload, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });

            navigate("/management/departures");
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
            const payload = { ...formValues };
            console.log("Payload >>>", payload);

            await axios.put(`${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/departure/${departure_id}`, payload, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });
            navigate("/management/departures");
        } catch (error) {
            console.log('error > ', error);
        } finally {
            setLoadingSubmit(false);
        }
    };

    return {
        formValues,
        loadingSubmit,
        fetchDepartureData,
        handleSubmit,
        handleUpdateSubmit,
        setFormValues
    };
}
