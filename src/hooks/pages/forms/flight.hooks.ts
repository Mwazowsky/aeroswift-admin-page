import axios from 'axios';
import { FormEvent, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IFlight } from 'src/content/applications/Flights/flight.types';

export default function useFlightForm() {
    const { flight_id } = useParams();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState<IFlight>({
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
        iata: "",
    });
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

    const fetchFlightData = useCallback(async () => {
        try {
            const response = await axios.get(
                `http://localhost:8060/api/flight/${flight_id}`,
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            const flightData = response.data.data[0];
            console.log(flightData);
            setFormValues(flightData);
        } catch (error) {
            console.log("error > ", error);
        }
    }, [flight_id]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoadingSubmit(true);

            const { flight_id, ...payload } = formValues;

            console.log("Payload >>>", payload);

            await axios.post('http://localhost:8060/api/flight/', payload, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });

            navigate("/management/flights");
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

            await axios.put(`http://localhost:8060/api/flight/${flight_id}`, payload, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });
            navigate("/management/flights");
        } catch (error) {
            console.log('error > ', error);
        } finally {
            setLoadingSubmit(false);
        }
    };

    return {
        formValues,
        loadingSubmit,
        fetchFlightData,
        handleSubmit,
        handleUpdateSubmit,
        setFormValues
    };
}
