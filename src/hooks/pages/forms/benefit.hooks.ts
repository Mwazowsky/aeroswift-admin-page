import axios from 'axios';
import { FormEvent, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IBenefit } from 'src/content/applications/Benefits/benefit.types';

export default function useBenefitForm() {
    const { benefit_id } = useParams();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState<IBenefit>({
        benefit_id: 0,
        flight_id: 0,
        name: "",
        detail: ""
    });
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

    const fetchBenefitData = useCallback(async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/benefit/${benefit_id}`,
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            const benefitData = response.data.data;
            setFormValues(benefitData);
        } catch (error) {
            console.log("error > ", error);
        }
    }, [benefit_id]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoadingSubmit(true);

            // Omit benefit_id from the payload
            const { benefit_id, ...payload } = formValues;

            console.log("Payload >>>", payload);

            await axios.post(`${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/benefit/`, payload, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });

            navigate("/management/benefits");
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

            await axios.put(`${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/benefit/${benefit_id}`, payload, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });
            navigate("/management/benefits");
        } catch (error) {
            console.log('error > ', error);
        } finally {
            setLoadingSubmit(false);
        }
    };

    return {
        formValues,
        loadingSubmit,
        fetchBenefitData,
        handleSubmit,
        handleUpdateSubmit,
        setFormValues
    };
}
