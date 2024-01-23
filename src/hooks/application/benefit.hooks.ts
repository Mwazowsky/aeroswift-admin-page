import axios from 'axios';
import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react';
import { IBenefit } from '../../content/applications/Benefits/benefit.types';
import { IApiResponse, IMeta, IParams } from '../../services/types';
import { useNavigate } from 'react-router-dom';

type BenefitData = Array<IBenefit>;

export default function useBenefits() {
  const navigate = useNavigate();
  const [params, setParams] = useState<IParams>({
    page: 1,
    size: 10,
  });
  const [meta, setMeta] = useState<IMeta>();
  const [loading, setLoading] = useState<boolean>(false);
  const [benefits, setBenefits] = useState<BenefitData>([]);

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
    record: IBenefit
  ) => {
    e.stopPropagation();
    const confirmed = confirm('Are you sure want to delete?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8060/api/benefit/${record?.benefit_id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        await fetchBenefit();
      } catch (error) {
        console.log('error > ', error);
      }
    }
  };

  const handleRemoveMultiple = async (
    e: MouseEvent<HTMLButtonElement>,
    benefitIds: number[]
  ) => {
    e.stopPropagation();
    const confirmed = confirm('Are you sure want to delete?');
    if (confirmed) {
      try {
        const deletePromises = benefitIds.map(async (benefitId) => {
          await axios.delete(`http://localhost:8060/api/benefit/${benefitId}`, {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          });
        });
        console.log(deletePromises);
        await Promise.all(deletePromises);
        await fetchBenefit(); // Assuming fetchCars fetches the updated list
      } catch (error) {
        console.log('error > ', error);
      }
    }
  };

  const handleEdit = (e: MouseEvent<HTMLButtonElement>, record: IBenefit) => {
    e.stopPropagation();
    navigate(`/management/benefits/update/${record.benefit_id}`);
  };

  const fetchBenefit = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get<IApiResponse<BenefitData>>(
        'http://localhost:8060/api/benefit/',
        {
          params,
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      // console.log("Response hook >>> ", response);
      setBenefits(response?.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      console.log('error > ', error);
    } finally {
      setLoading(false);
    }
  }, [params]); // Include only the necessary dependencies here

  useEffect(() => {
    fetchBenefit();
  }, [fetchBenefit]);

  return {
    benefits,
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
