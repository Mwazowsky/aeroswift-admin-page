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
import { IArrival } from "./arrival.types";
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

interface ArrivalsTableProps {
  className?: string;
  arrivals: IArrival[];
  handleEdit: (event: React.MouseEvent<HTMLButtonElement>, arrival: IArrival) => void;
  handleRemove: (event: React.MouseEvent<HTMLButtonElement>, arrival: IArrival) => void;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveMultiple: (
    event: React.MouseEvent<HTMLButtonElement>,
    arrivalIds: number[]
  ) => void;
}


const applyPagination = (arrivals: IArrival[], page: number, limit: number): IArrival[] => {
  return arrivals.slice(page * limit, page * limit + limit);
};

const ArrivalsTable: FC<ArrivalsTableProps> = ({
  arrivals,
  handleEdit,
  handleRemove,
  handleRemoveMultiple,
  handleSearch,
}) => {
  const navigate = useNavigate();
  const [selectedArrivals, setSelectedArrivals] = useState<number[]>([]);
  const selectedBulkActions = selectedArrivals.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handleSelectAllArrivals = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedArrivals(event.target.checked ? arrivals.map((arrival) => arrival.arrival_id) : []);
  };

  const handleSelectOnecar = (arrival_id: number): void => {
    if (!selectedArrivals.includes(arrival_id)) {
      setSelectedArrivals((prevSelected) => [...prevSelected, arrival_id]);
    } else {
      setSelectedArrivals((prevSelected) =>
        prevSelected.filter((id) => id !== arrival_id)
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

  const paginatedArrivals = applyPagination(arrivals, page, limit);
  const selectedSomeArrivals =
    selectedArrivals.length > 0 && selectedArrivals.length < arrivals.length;

  const selectedAllArrivals = selectedArrivals.length === arrivals.length;

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
                onClick={(e) => handleRemoveMultiple(e, selectedArrivals)}
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
          title="arrivals List"
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
                  checked={selectedAllArrivals}
                  indeterminate={selectedSomeArrivals}
                  onChange={handleSelectAllArrivals}
                />
              </TableCell>
              <TableCell>Airport ID</TableCell>
              <TableCell>arrival Terminal</TableCell>
              <TableCell>Scheduled Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedArrivals.map((arrival) => {
              const iscarselected = selectedArrivals.includes(arrival.arrival_id);
              return (
                <TableRow
                  hover
                  data-testid="table-rows"
                  key={arrival.arrival_id}
                  selected={iscarselected}
                  onClick={() => navigate(`/management/arrivals/details/${arrival.arrival_id}`)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={iscarselected}
                      onChange={() => handleSelectOnecar(arrival.arrival_id)}
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
                      {arrival.airport_id}
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
                      {arrival.terminal}
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
                      {arrival.scheduled_time}
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
                        onClick={(e) => handleEdit(e, arrival)}
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
                        onClick={(e) => handleRemove(e, arrival)}
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
          count={arrivals.length}
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

ArrivalsTable.propTypes = {
  arrivals: PropTypes.array.isRequired,
};

ArrivalsTable.defaultProps = {
  arrivals: [],
};

export default ArrivalsTable;
