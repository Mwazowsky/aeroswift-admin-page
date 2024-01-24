import { Card } from '@mui/material';

import DeparturesTable from './ArrivalsTable';

import useArrivals from "../../../hooks/application/arrival.hooks";

function Arrivals() {
  const {
    arrivals,
    handleEdit,
    handleRemove,
    handleRemoveMultiple,
    handleSearch
  } = useArrivals();

  return (
    <Card>
      <DeparturesTable 
        arrivals={arrivals}
        handleEdit={handleEdit} 
        handleRemove={handleRemove} 
        handleSearch={handleSearch}
        handleRemoveMultiple={handleRemoveMultiple} 
      />
    </Card>
  );
}

export default Arrivals;
