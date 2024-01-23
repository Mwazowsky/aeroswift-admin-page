import { Card } from '@mui/material';

import AirlinesTable from './AirportsTable';

import useAirlines from "../../../hooks/application/airline.hooks";

function Airports() {
  const {
    airlines,
    filters, 
    handleStatusChange,
    handleEdit,
    handleRemove,
    handleRemoveMultiple,
    handleSearch
  } = useAirlines();

  return (
    <Card>
      <AirlinesTable 
        airlines={airlines}
        filters={filters}
        handleStatusChange={handleStatusChange}
        handleEdit={handleEdit} 
        handleRemove={handleRemove} 
        handleSearch={handleSearch}
        handleRemoveMultiple={handleRemoveMultiple} 
      />
    </Card>
  );
}

export default Airports;
