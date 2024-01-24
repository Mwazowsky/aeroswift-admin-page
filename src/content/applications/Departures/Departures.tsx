import { Card } from '@mui/material';

import DeparturesTable from './DeparturesTable';

import useDepartures from "../../../hooks/application/departure.hooks";

function Departures() {
  const {
    departures,
    handleEdit,
    handleRemove,
    handleRemoveMultiple,
    handleSearch
  } = useDepartures();

  return (
    <Card>
      <DeparturesTable 
        departures={departures}
        handleEdit={handleEdit} 
        handleRemove={handleRemove} 
        handleSearch={handleSearch}
        handleRemoveMultiple={handleRemoveMultiple} 
      />
    </Card>
  );
}

export default Departures;
