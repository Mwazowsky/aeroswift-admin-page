import axios from 'axios';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IAirline } from 'src/content/applications/Airlines/airline.types';
import { IFileItem } from 'src/services/types';

export default function useAirlineForm() {
    const { airline_id } = useParams();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState<IAirline>({
        airline_id: 0,
        name: "",
        iata: "",
        image: "",
    });
    const [loadingCover, setLoadingCover] = useState<boolean>(false);
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
    const [fileItem, setFileItem] = useState<IFileItem>();

    const fetchAirlineData = useCallback(async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/airline/${airline_id}`,
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            const airlineData = response.data.data;
            setFormValues(airlineData);
        } catch (error) {
            console.log("error > ", error);
        }
    }, [airline_id]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoadingSubmit(true);

            // Omit airline_id from the payload
            const { airline_id, ...payload } = formValues;
            payload.image = fileItem?.secure_url;

            console.log("Payload >>>", payload);

            await axios.post(`${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/airline/`, payload, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });

            navigate("/management/airlines");
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
                ...formValues,
                image: fileItem ? fileItem?.secure_url : formValues.image
            };
            console.log("Payload >>>", payload);

            await axios.put(`${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/airline/${airline_id}`, payload, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });
            navigate("/management/airlines");
        } catch (error) {
            console.log('error > ', error);
        } finally {
            setLoadingSubmit(false);
        }
    };

    const handleUploadCover = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        console.log(files);
        if (files && files.length > 0) {
            try {
                setLoadingCover(true);
                const formData = new FormData();
                formData.append('image', files[0]);

                const response = await axios.post(
                    `${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/airline/upload`,
                    formData,
                    {
                        headers: {
                            Authorization: localStorage.getItem('token'),
                        },
                    }
                );
                setFileItem(response.data.data);
            } catch (error) {
                console.log('error > ', error);
            } finally {
                setLoadingCover(false);
            }
        }
    };

    return {
        formValues,
        loadingCover,
        loadingSubmit,
        fileItem,
        fetchAirlineData,
        handleSubmit,
        handleUpdateSubmit,
        handleUploadCover,
        setFormValues
    };
}