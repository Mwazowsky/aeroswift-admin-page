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
  Typography,
  useTheme,
  CardHeader,
} from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { IBenefit } from "./benefit.types";
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

interface BenefitsTableProps {
  className?: string;
  benefits: IBenefit[];
  handleEdit: (
    event: React.MouseEvent<HTMLButtonElement>,
    benefit: IBenefit
  ) => void;
  handleRemove: (
    event: React.MouseEvent<HTMLButtonElement>,
    benefit: IBenefit
  ) => void;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveMultiple: (
    event: React.MouseEvent<HTMLButtonElement>,
    carIds: number[]
  ) => void;
}

const applyPagination = (
  benefits: IBenefit[],
  page: number,
  limit: number
): IBenefit[] => {
  return benefits.slice(page * limit, page * limit + limit);
};

const BenefitsTable: FC<BenefitsTableProps> = ({
  benefits,
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

  const handleSelectAllCars = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedcars(
      event.target.checked ? benefits.map((flight) => flight.flight_id) : []
    );
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

  const paginatedBenefits = applyPagination(benefits, page, limit);
  const selectedSomecars =
    selectedcars.length > 0 && selectedcars.length < benefits.length;

  const selectedAllcars = selectedcars.length === benefits.length;

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
              <TextField
                name="search"
                label="Search"
                placeholder="Search"
                onChange={handleSearch}
              />
            </Box>
          }
          title="Benefits List"
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
              <TableCell>Flight ID</TableCell>
              <TableCell>Benefit Name</TableCell>
              <TableCell>Benefit Detail</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBenefits.map((benefit) => {
              const iscarselected = selectedcars.includes(benefit.benefit_id);
              return (
                <TableRow
                  hover
                  data-testid="table-rows"
                  key={benefit.benefit_id}
                  selected={iscarselected}
                  onClick={() =>
                    navigate(
                      `/management/benefits/details/${benefit.benefit_id}`
                    )
                  }
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={iscarselected}
                      onChange={() => handleSelectOnecar(benefit.benefit_id)}
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
                      {benefit.flight_id}
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
                      {benefit.name}
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
                      {benefit.detail}
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
                        onClick={(e) => handleEdit(e, benefit)}
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
                        onClick={(e) => handleRemove(e, benefit)}
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
          count={benefits.length}
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

BenefitsTable.propTypes = {
  benefits: PropTypes.array.isRequired,
};

BenefitsTable.defaultProps = {
  benefits: [],
};

export default BenefitsTable;
