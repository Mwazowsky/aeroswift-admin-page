import axios from 'axios';
import { FormEvent, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IArrival } from 'src/content/applications/Arrivals/arrival.types';

export default function useArrivalForm() {
    const { arrival_id } = useParams();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState<IArrival>({
        arrival_id: 0,
        airport_id: 0,
        terminal: "",
        scheduled_time: "",
    });
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

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
            setFormValues(arrivalData);
        } catch (error) {
            console.log("error > ", error);
        }
    }, [arrival_id]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoadingSubmit(true);

            const { arrival_id, ...payload } = formValues;

            console.log("Payload >>>", payload);

            await axios.post(`${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/arrival/`, payload, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });

            navigate("/management/arrivals");
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

            await axios.put(`${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/arrival/${arrival_id}`, payload, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });
            navigate("/management/arrivals");
        } catch (error) {
            console.log('error > ', error);
        } finally {
            setLoadingSubmit(false);
        }
    };

    return {
        formValues,
        loadingSubmit,
        fetchArrivalData,
        handleSubmit,
        handleUpdateSubmit,
        setFormValues
    };
}
