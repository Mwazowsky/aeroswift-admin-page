import { Card } from '@mui/material';

import BenefitsTable from './BenefitsTable';

import useBenefits from "../../../hooks/application/benefit.hooks";

function Benefits() {
  const {
    benefits,
    handleEdit,
    handleRemove,
    handleRemoveMultiple,
    handleSearch,
  } = useBenefits();

  return (
    <Card>
      <BenefitsTable 
        benefits={benefits}
        handleEdit={handleEdit} 
        handleRemove={handleRemove} 
        handleSearch={handleSearch}
        handleRemoveMultiple={handleRemoveMultiple} 
      />
    </Card>
  );
}

export default Benefits;
