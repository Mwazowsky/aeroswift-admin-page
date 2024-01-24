import axios from 'axios';
import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react';
import { IApiResponse, IMeta, IParams } from '../../services/types';
import { useNavigate } from 'react-router-dom';
import { IArrival } from 'src/content/applications/Arrivals/arrival.types';

type ArrivalData = Array<IArrival>;

export default function useArrivals() {
  const navigate = useNavigate();
  const [params, setParams] = useState<IParams>({
    page: 1,
    size: 10,
  });
  const [meta, setMeta] = useState<IMeta>();
  const [loading, setLoading] = useState<boolean>(false);
  const [arrivals, setArrivals] = useState<ArrivalData>([]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setParams({
      ...params,
      search: value,
    });
    console.log(params)
  };

  const handleRemove = async (
    e: MouseEvent<HTMLButtonElement>,
    record: IArrival
  ) => {
    e.stopPropagation();
    const confirmed = confirm('Are you sure want to delete?');
    if (confirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/arrival/${record?.arrival_id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        await fetchArrival();
      } catch (error) {
        console.log('error > ', error);
      }
    }
  };

  const handleRemoveMultiple = async (
    e: MouseEvent<HTMLButtonElement>,
    arrivalIds: number[]
  ) => {
    e.stopPropagation();
    const confirmed = confirm('Are you sure want to delete?');
    if (confirmed) {
      try {
        const deletePromises = arrivalIds.map(async (arrivalId) => {
          await axios.delete(`${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/arrival/${arrivalId}`, {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          });
        });
        console.log(deletePromises);
        await Promise.all(deletePromises);
        await fetchArrival(); // Assuming fetchCars fetches the updated list
      } catch (error) {
        console.log('error > ', error);
      }
    }
  };

  const handleEdit = (e: MouseEvent<HTMLButtonElement>, record: IArrival) => {
    e.stopPropagation();
    navigate(`/management/arrivals/update/${record.arrival_id}`);
  };

  const fetchArrival = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get<IApiResponse<ArrivalData>>(
        `${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/arrival/`,
        {
          params,
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      // console.log("Response hook >>> ", response);
      setArrivals(response?.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      console.log('error > ', error);
    } finally {
      setLoading(false);
    }
  }, [params]); // Include only the necessary dependencies here

  useEffect(() => {
    fetchArrival();
  }, [fetchArrival]);

  return {
    arrivals,
    params,
    loading,
    meta,
    setParams,
    handleEdit,
    handleRemove,
    handleRemoveMultiple,
    handleSearch,
  };
}
