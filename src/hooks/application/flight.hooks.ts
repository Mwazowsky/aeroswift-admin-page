import axios from 'axios';
import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react';
import { IFlight } from '../../content/applications/Flights/flight.types';
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
        id: "scheduled",
        name: "Scheduled",
        value: "scheduled",
    },
    {
        id: "in-flight",
        name: "In-Flight",
        value: "in-flight",
    },
];

type FlightData = Array<IFlight>;

export default function useFlights() {
  const navigate = useNavigate();
  const [params, setParams] = useState<IParams>({
    page: 1,
    size: 10,
  });
  const [meta, setMeta] = useState<IMeta>();
  const [loading, setLoading] = useState<boolean>(false);
  const [flights, setFlights] = useState<FlightData>([]);
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
    record: IFlight
  ) => {
    e.stopPropagation();
    const confirmed = confirm('Are you sure want to delete?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8060/api/flight/${record?.flight_id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        await fetchFlight();
      } catch (error) {
        console.log('error > ', error);
      }
    }
  };

  const handleRemoveMultiple = async (
    e: MouseEvent<HTMLButtonElement>,
    flightIds: number[]
  ) => {
    e.stopPropagation();
    const confirmed = confirm('Are you sure want to delete?');
    if (confirmed) {
      try {
        const deletePromises = flightIds.map(async (flightId) => {
          await axios.delete(`http://localhost:8060/api/flight/${flightId}`, {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          });
        });
        console.log(deletePromises);
        await Promise.all(deletePromises);
        await fetchFlight(); // Assuming fetchCars fetches the updated list
      } catch (error) {
        console.log('error > ', error);
      }
    }
  };

  const handleEdit = (e: MouseEvent<HTMLButtonElement>, record: IFlight) => {
    e.stopPropagation();
    navigate(`/management/flights/update/${record.flight_id}`);
  };

  const fetchFlight = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get<IApiResponse<FlightData>>(
        'http://localhost:8060/api/flight/',
        {
          params,
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      // console.log("Response hook >>> ", response);
      setFlights(response?.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      console.log('error > ', error);
    } finally {
      setLoading(false);
    }
  }, [params]); // Include only the necessary dependencies here

  useEffect(() => {
    fetchFlight();
  }, [fetchFlight]);

  return {
    flights,
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
