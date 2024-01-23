import { Card } from '@mui/material';

import FlightsTable from './FlightsTable';

import useFlights from "../../../hooks/application/flight.hooks";

function Flights() {
  const {
    flights,
    filters, 
    handleStatusChange,
    handleEdit,
    handleRemove,
    handleRemoveMultiple,
    handleSearch
  } = useFlights();

  return (
    <Card>
      <FlightsTable 
        flights={flights}
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

export default Flights;
