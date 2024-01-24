import { Card } from '@mui/material';

import FlightsTable from './TicketsTable';

import useTickets from "../../../hooks/application/ticket.hooks";

function Tickets() {
  const {
    tickets,
    filters, 
    handleStatusChange,
    handleEdit,
    handleRemove,
    handleRemoveMultiple,
    handleSearch
  } = useTickets();

  return (
    <Card>
      <FlightsTable 
        tickets={tickets}
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

export default Tickets;
