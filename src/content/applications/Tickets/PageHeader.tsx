import { Typography, Button, Grid } from "@mui/material";
import { Link } from 'react-router-dom';

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Tickets List
        </Typography>
        <Typography variant="subtitle2">
          These are list of all Tickets
        </Typography>
      </Grid>
      <Grid item>
        <Link to={"/management/tickets/create"}>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            Create Ticket
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
