import axios from 'axios';
import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react';
import { IApiResponse, IMeta, IParams } from '../../services/types';
import { useNavigate } from 'react-router-dom';
import { Filters } from "../../types/productsTable";
import { SelectChangeEvent } from '@mui/material';
import { ITicket } from '../../content/applications/Tickets/ticket.types';

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

type TicketData = Array<ITicket>;

export default function useTickets() {
  const navigate = useNavigate();
  const [params, setParams] = useState<IParams>({
    page: 1,
    size: 10,
  });
  const [meta, setMeta] = useState<IMeta>();
  const [loading, setLoading] = useState<boolean>(false);
  const [tickets, setTickets] = useState<TicketData>([]);
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
    record: ITicket
  ) => {
    e.stopPropagation();
    const confirmed = confirm('Are you sure want to delete?');
    if (confirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/ticket/${record?.ticket_id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        await fetchTicket();
      } catch (error) {
        console.log('error > ', error);
      }
    }
  };

  const handleRemoveMultiple = async (
    e: MouseEvent<HTMLButtonElement>,
    ticketIds: number[]
  ) => {
    e.stopPropagation();
    const confirmed = confirm('Are you sure want to delete?');
    if (confirmed) {
      try {
        const deletePromises = ticketIds.map(async (ticketId) => {
          await axios.delete(`${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/ticket/${ticketId}`, {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          });
        });
        console.log(deletePromises);
        await Promise.all(deletePromises);
        await fetchTicket(); // Assuming fetchCars fetches the updated list
      } catch (error) {
        console.log('error > ', error);
      }
    }
  };

  const handleEdit = (e: MouseEvent<HTMLButtonElement>, record: ITicket) => {
    e.stopPropagation();
    navigate(`/management/tickets/update/${record.ticket_id}`);
  };

  const fetchTicket = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get<IApiResponse<TicketData>>(
        `${import.meta.env.VITE_NODE_BACKEND_BASE_URL}/api/ticket/`,
        {
          params,
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      // console.log("Response hook >>> ", response);
      setTickets(response?.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      console.log('error > ', error);
    } finally {
      setLoading(false);
    }
  }, [params]); // Include only the necessary dependencies here

  useEffect(() => {
    fetchTicket();
  }, [fetchTicket]);

  return {
    tickets,
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
