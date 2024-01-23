import axios from 'axios';
import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react';
import { IAirline } from '../../content/applications/Airlines/airline.types';
import { IApiResponse, IMeta, IParams } from '../../services/types';
import { useNavigate } from 'react-router-dom';
import { Filters } from "../../types/productsTable";
import { SelectChangeEvent } from '@mui/material';

const statusOptions = [
    {
        id: "all",
        name: "All",
        value: "all",
    },
    {
        id: "available",
        name: "Available",
        value: "available",
    },
    {
        id: "unavailable",
        name: "Unavailable",
        value: "unavailable",
    },
];

type AirlineData = Array<IAirline>;

export default function useAirlines() {
  const navigate = useNavigate();
  const [params, setParams] = useState<IParams>({
    page: 1,
    size: 10,
  });
  const [meta, setMeta] = useState<IMeta>();
  const [loading, setLoading] = useState<boolean>(false);
  const [airlines, setAirlines] = useState<AirlineData>([]);
  const [filters, setFilters] = useState<Filters>({ status: "all" });

  const handleStatusChange = (e: SelectChangeEvent<string>): void => {
    const value = e.target.value;
    console.log("value >>>", value);
    const selectedOption = statusOptions.find((option) => option.id === value);

    if (selectedOption) {
      console.log("Selected Option:", selectedOption.value);
      setFilters((prevFilters) => ({
        ...prevFilters,
        status: selectedOption.value,
      }));
    } else {
      console.log("No matching option found for value:", value);
    }
  };

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
    record: IAirline
  ) => {
    e.stopPropagation();
    const confirmed = confirm('Are you sure want to delete?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8060/api/airline/${record?.airline_id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        await fetchAirline();
      } catch (error) {
        console.log('error > ', error);
      }
    }
  };

  const handleRemoveMultiple = async (
    e: MouseEvent<HTMLButtonElement>,
    carIds: number[]
  ) => {
    e.stopPropagation();
    const confirmed = confirm('Are you sure want to delete?');
    if (confirmed) {
      try {
        const deletePromises = carIds.map(async (carId) => {
          await axios.delete(`http://localhost:8060/api/airline/${carId}`, {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          });
        });
        console.log(deletePromises);
        await Promise.all(deletePromises);
        await fetchAirline(); // Assuming fetchCars fetches the updated list
      } catch (error) {
        console.log('error > ', error);
      }
    }
  };

  const handleEdit = (e: MouseEvent<HTMLButtonElement>, record: IAirline) => {
    e.stopPropagation();
    navigate(`/management/airlines/update/${record.airline_id}`);
  };

  const fetchAirline = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get<IApiResponse<AirlineData>>(
        'http://localhost:8060/api/airline/',
        {
          params,
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      // console.log("Response hook >>> ", response);
      setAirlines(response?.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      console.log('error > ', error);
    } finally {
      setLoading(false);
    }
  }, [params]); // Include only the necessary dependencies here

  useEffect(() => {
    fetchAirline();
  }, [fetchAirline]);

  return {
    airlines,
    filters, 
    params,
    loading,
    meta,
    setParams,
    handleStatusChange,
    handleEdit,
    handleRemove,
    handleRemoveMultiple,
    handleSearch,
  };
}
