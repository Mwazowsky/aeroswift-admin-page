import axios from 'axios';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IBenefit } from 'src/content/applications/Benefits/benefit.types';

export default function useBenefitDetails() {
  const { benefit_id } = useParams();
  const [benefit, setBenefit] = useState<IBenefit>({
    benefit_id: 0,
    flight_id: 0,
    name: "",
    detail: ""
  });

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
      setBenefit(benefitData);
    } catch (error) {
      console.log("error > ", error);
    }
  }, [benefit_id]);

  return {
    benefit,
    fetchBenefitData
  };
}
