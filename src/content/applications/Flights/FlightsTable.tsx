import { FC, ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  Stack,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { IFlight } from "./flight.types";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import BulkActions from "./BulkActions";

import { Filters } from "../../../types/productsTable";

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

interface FlightsTableProps {
  className?: string;
  flights: IFlight[];
  filters: Filters;
  handleStatusChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleEdit: (event: React.MouseEvent<HTMLButtonElement>, airline: IFlight) => void;
  handleRemove: (event: React.MouseEvent<HTMLButtonElement>, airline: IFlight) => void;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveMultiple: (
    event: React.MouseEvent<HTMLButtonElement>,
    carIds: number[]
  ) => void;
}


const applyPagination = (airlines: IFlight[], page: number, limit: number): IFlight[] => {
  return airlines.slice(page * limit, page * limit + limit);
};

const FlightsTable: FC<FlightsTableProps> = ({
  flights,
  filters,
  handleStatusChange,
  handleEdit,
  handleRemove,
  handleRemoveMultiple,
  handleSearch,
}) => {
  const navigate = useNavigate();
  const [selectedcars, setSelectedcars] = useState<number[]>([]);
  const selectedBulkActions = selectedcars.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

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

  const handleSelectAllCars = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedcars(event.target.checked ? flights.map((flight) => flight.flight_id) : []);
    console.log(selectedcars);
  };

  const handleSelectOnecar = (car_id: number): void => {
    if (!selectedcars.includes(car_id)) {
      setSelectedcars((prevSelected) => [...prevSelected, car_id]);
    } else {
      setSelectedcars((prevSelected) =>
        prevSelected.filter((id) => id !== car_id)
      );
    }
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ): void => {
    event.preventDefault();
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedFlights = applyPagination(flights, page, limit);
  const selectedSomecars =
    selectedcars.length > 0 && selectedcars.length < flights.length;

  const selectedAllcars = selectedcars.length === flights.length;

  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions
            actionElement={
              <ButtonError
                sx={{ ml: 1 }}
                startIcon={<DeleteTwoToneIcon />}
                variant="contained"
                onClick={(e) => handleRemoveMultiple(e, selectedcars)}
              >
                Delete
              </ButtonError>
            }
          />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box sx={{ width: "100%" }}>
              <Stack
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  height: "100%",
                }}
                gap={1}
              >
                <TextField
                  name="search"
                  label="Search"
                  placeholder="Search"
                  onChange={handleSearch}
                />
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filters.status}
                    onChange={handleStatusChange}
                    label="Status"
                    autoWidth
                  >
                    {statusOptions.map((statusOption) => (
                      <MenuItem key={statusOption.id} value={statusOption.id}>
                        {statusOption.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Box>
          }
          title="Flights List"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllcars}
                  indeterminate={selectedSomecars}
                  onChange={handleSelectAllCars}
                />
              </TableCell>
              <TableCell>Flight IATA</TableCell>
              <TableCell>Flight Status</TableCell>
              <TableCell>Flight Transit</TableCell>
              <TableCell>Flight Seats Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedFlights.map((flight) => {
              const iscarselected = selectedcars.includes(flight.flight_id);
              return (
                <TableRow
                  hover
                  data-testid="table-rows"
                  key={flight.flight_id}
                  selected={iscarselected}
                  onClick={() => navigate(`/management/flights/details/${flight.flight_id}`)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={iscarselected}
                      onChange={() => handleSelectOnecar(flight.flight_id)}
                      value={iscarselected}
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                        event.stopPropagation()
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {flight.iata}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {flight.flight_status}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {flight.transit} 
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      First CLass: {flight.first_seat} 
                      Business CLass: {flight.business_seat} 
                      Economy CLass: {flight.economy_seat} 
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          "&:hover": {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={(e) => handleEdit(e, flight)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          "&:hover": { background: theme.colors.error.lighter },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={(e) => handleRemove(e, flight)}
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={flights.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

FlightsTable.propTypes = {
  flights: PropTypes.array.isRequired,
};

FlightsTable.defaultProps = {
  flights: [],
};

export default FlightsTable;
