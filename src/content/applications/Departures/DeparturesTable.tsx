import { FC, ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Tooltip,
  Divider,
  Box,
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
  Stack,
  Typography,
  useTheme,
  CardHeader} from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { IDeparture } from "./departure.types";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import BulkActions from "./BulkActions";


const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

interface DeparturesTableProps {
  className?: string;
  departures: IDeparture[];
  handleEdit: (event: React.MouseEvent<HTMLButtonElement>, departure: IDeparture) => void;
  handleRemove: (event: React.MouseEvent<HTMLButtonElement>, departure: IDeparture) => void;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveMultiple: (
    event: React.MouseEvent<HTMLButtonElement>,
    departureIds: number[]
  ) => void;
}


const applyPagination = (departures: IDeparture[], page: number, limit: number): IDeparture[] => {
  return departures.slice(page * limit, page * limit + limit);
};

const DeparturesTable: FC<DeparturesTableProps> = ({
  departures,
  handleEdit,
  handleRemove,
  handleRemoveMultiple,
  handleSearch,
}) => {
  const navigate = useNavigate();
  const [selectedDepartures, setSelectedDepartures] = useState<number[]>([]);
  const selectedBulkActions = selectedDepartures.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handleSelectAllDepartures = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedDepartures(event.target.checked ? departures.map((departure) => departure.departure_id) : []);
  };

  const handleSelectOnecar = (departure_id: number): void => {
    if (!selectedDepartures.includes(departure_id)) {
      setSelectedDepartures((prevSelected) => [...prevSelected, departure_id]);
    } else {
      setSelectedDepartures((prevSelected) =>
        prevSelected.filter((id) => id !== departure_id)
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

  const paginatedDepartures = applyPagination(departures, page, limit);
  const selectedSomeDepartures =
    selectedDepartures.length > 0 && selectedDepartures.length < departures.length;

  const selectedAllDepartures = selectedDepartures.length === departures.length;

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
                onClick={(e) => handleRemoveMultiple(e, selectedDepartures)}
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
              </Stack>
            </Box>
          }
          title="Departures List"
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
                  checked={selectedAllDepartures}
                  indeterminate={selectedSomeDepartures}
                  onChange={handleSelectAllDepartures}
                />
              </TableCell>
              <TableCell>Airport ID</TableCell>
              <TableCell>Departure Terminal</TableCell>
              <TableCell>Scheduled Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDepartures.map((departure) => {
              const iscarselected = selectedDepartures.includes(departure.departure_id);
              return (
                <TableRow
                  hover
                  data-testid="table-rows"
                  key={departure.departure_id}
                  selected={iscarselected}
                  onClick={() => navigate(`/management/departures/details/${departure.departure_id}`)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={iscarselected}
                      onChange={() => handleSelectOnecar(departure.departure_id)}
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
                      {departure.airport_id}
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
                      {departure.terminal}
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
                      {departure.scheduled_time}
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
                        onClick={(e) => handleEdit(e, departure)}
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
                        onClick={(e) => handleRemove(e, departure)}
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
          count={departures.length}
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

DeparturesTable.propTypes = {
  departures: PropTypes.array.isRequired,
};

DeparturesTable.defaultProps = {
  departures: [],
};

export default DeparturesTable;
