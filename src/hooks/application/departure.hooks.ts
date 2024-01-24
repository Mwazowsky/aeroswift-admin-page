import axios from 'axios';
import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react';
import { IApiResponse, IMeta, IParams } from '../../services/types';
import { useNavigate } from 'react-router-dom';
import { IDeparture } from 'src/content/applications/Departures/departure.types';

type DepartureData = Array<IDeparture>;

export default function useDepartures() {
  const navigate = useNavigate();
  const [params, setParams] = useState<IParams>({
    page: 1,
    size: 10,
  });
  const [meta, setMeta] = useState<IMeta>();
  const [loading, setLoading] = useState<boolean>(false);
  const [departures, setDepartures] = useState<DepartureData>([]);

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
    record: IDeparture
  ) => {
    e.stopPropagation();
    const confirmed = confirm('Are you sure want to delete?');
    if (confirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/departure/${record?.departure_id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        await fetchDeparture();
      } catch (error) {
        console.log('error > ', error);
      }
    }
  };

  const handleRemoveMultiple = async (
    e: MouseEvent<HTMLButtonElement>,
    departureIds: number[]
  ) => {
    e.stopPropagation();
    const confirmed = confirm('Are you sure want to delete?');
    if (confirmed) {
      try {
        const deletePromises = departureIds.map(async (departureId) => {
          await axios.delete(`${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/departure/${departureId}`, {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          });
        });
        console.log(deletePromises);
        await Promise.all(deletePromises);
        await fetchDeparture(); // Assuming fetchCars fetches the updated list
      } catch (error) {
        console.log('error > ', error);
      }
    }
  };

  const handleEdit = (e: MouseEvent<HTMLButtonElement>, record: IDeparture) => {
    e.stopPropagation();
    navigate(`/management/departures/update/${record.departure_id}`);
  };

  const fetchDeparture = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get<IApiResponse<DepartureData>>(
        `${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/departure/`,
        {
          params,
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      // console.log("Response hook >>> ", response);
      setDepartures(response?.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      console.log('error > ', error);
    } finally {
      setLoading(false);
    }
  }, [params]); // Include only the necessary dependencies here

  useEffect(() => {
    fetchDeparture();
  }, [fetchDeparture]);

  return {
    departures,
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
