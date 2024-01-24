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
import { ITicket } from "./ticket.types";
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

interface TicketsTableProps {
  className?: string;
  tickets: ITicket[];
  filters: Filters;
  handleStatusChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleEdit: (event: React.MouseEvent<HTMLButtonElement>, airline: ITicket) => void;
  handleRemove: (event: React.MouseEvent<HTMLButtonElement>, airline: ITicket) => void;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveMultiple: (
    event: React.MouseEvent<HTMLButtonElement>,
    carIds: number[]
  ) => void;
}


const applyPagination = (tickets: ITicket[], page: number, limit: number): ITicket[] => {
  return tickets.slice(page * limit, page * limit + limit);
};

const TicketsTable: FC<TicketsTableProps> = ({
  tickets,
  filters,
  handleStatusChange,
  handleEdit,
  handleRemove,
  handleRemoveMultiple,
  handleSearch,
}) => {
  const navigate = useNavigate();
  const [selectedTickets, setSelectedTickets] = useState<number[]>([]);
  const selectedBulkActions = selectedTickets.length > 0;
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

  const handleSelectAllTickets = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedTickets(event.target.checked ? tickets.map((ticket) => ticket.ticket_id) : []);
    console.log(selectedTickets);
  };

  const handleSelectOneTicket = (ticket_id: number): void => {
    if (!selectedTickets.includes(ticket_id)) {
      setSelectedTickets((prevSelected) => [...prevSelected, ticket_id]);
    } else {
      setSelectedTickets((prevSelected) =>
        prevSelected.filter((id) => id !== ticket_id)
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

  const paginatedTickets = applyPagination(tickets, page, limit);
  const selectedSomeTickets =
    selectedTickets.length > 0 && selectedTickets.length < tickets.length;

  const selectedAllTickets = selectedTickets.length === tickets.length;

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
                onClick={(e) => handleRemoveMultiple(e, selectedTickets)}
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
          title="Tickets List"
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
                  checked={selectedAllTickets}
                  indeterminate={selectedSomeTickets}
                  onChange={handleSelectAllTickets}
                />
              </TableCell>
              <TableCell>Flight ID</TableCell>
              <TableCell>Ticket Class</TableCell>
              <TableCell>Ticket Amount</TableCell>
              <TableCell>Ticket Fare Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTickets.map((ticket) => {
              const isTickets = selectedTickets.includes(ticket.ticket_id);
              return (
                <TableRow
                  hover
                  data-testid="table-rows"
                  key={ticket.ticket_id}
                  selected={isTickets}
                  onClick={() => navigate(`/management/tickets/details/${ticket.ticket_id}`)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isTickets}
                      onChange={() => handleSelectOneTicket(ticket.ticket_id)}
                      value={isTickets}
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
                      {ticket.flight_id}
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
                      {ticket.ticket_type}
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
                      {ticket.ticket_amount} 
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
                      {ticket.fare_amount} 
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
                        onClick={(e) => handleEdit(e, ticket)}
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
                        onClick={(e) => handleRemove(e, ticket)}
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
          count={tickets.length}
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

TicketsTable.propTypes = {
  tickets: PropTypes.array.isRequired,
};

TicketsTable.defaultProps = {
  tickets: [],
};

export default TicketsTable;
