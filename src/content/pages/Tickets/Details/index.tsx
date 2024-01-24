import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

import PageTitle from "../../../../components/PageTitle";
import PageTitleWrapper from "../../../../components/PageTitleWrapper";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Stack,
} from "@mui/material";

import Footer from "../../../../components/Footer";

import Typography from "@mui/material/Typography";

import useTicketDetails from "../../../../hooks/pages/details/ticket.hooks";

function TicketDetails() {
  const { ticket, fetchTicketData } = useTicketDetails();

  useEffect(() => {
    fetchTicketData();
  }, [fetchTicketData]);

  return (
    <>
      <Helmet>
        <title>Details - AeroSwift Admin</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Details"
          subHeading="Details page containing ticket information."
          docs="https://material-ui.com/components/cards/"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title={`Ticket ID: ${ticket.ticket_id}`} />
              <Divider />
              <CardContent>
                <Card>
                  <Stack
                    direction={"row"}
                    justifyContent={"start"}
                    alignItems={"start"}
                    sx={{
                      height: "100%",
                    }}
                    gap={1}
                  >
                    <CardContent
                      sx={{
                        minWidth: "50%",
                      }}
                    >
                      <Stack
                        direction={"row"}
                        justifyContent={"start"}
                        alignItems={"start"}
                        sx={{
                          height: "100%",
                        }}
                        gap={1}
                      >
                        <Typography
                          sx={{ fontSize: 16 }}
                          color="text.primary"
                          variant="body1"
                          fontWeight="bold"
                          gutterBottom
                        >
                          Flight ID:
                        </Typography>
                        <Typography
                          sx={{ fontSize: 16 }}
                          color="text.secondary"
                          variant="body2"
                        >
                          {ticket.flight_id}
                        </Typography>
                      </Stack>
                      <Stack
                        direction={"row"}
                        justifyContent={"start"}
                        alignItems={"start"}
                        sx={{
                          height: "100%",
                        }}
                        gap={1}
                      >
                        <Typography
                          sx={{ fontSize: 16 }}
                          color="text.primary"
                          variant="body1"
                          fontWeight="bold"
                          gutterBottom
                        >
                          Ticket Class:
                        </Typography>
                        <Typography
                          sx={{ fontSize: 16 }}
                          color="text.secondary"
                          variant="body2"
                        >
                          {ticket.ticket_type}
                        </Typography>
                      </Stack>
                      <Stack
                        direction={"row"}
                        justifyContent={"start"}
                        alignItems={"start"}
                        sx={{
                          height: "100%",
                        }}
                        gap={1}
                      >
                        <Typography
                          sx={{ fontSize: 16 }}
                          color="text.primary"
                          variant="body1"
                          fontWeight="bold"
                          gutterBottom
                        >
                          Ticket Amount:
                        </Typography>
                        <Typography
                          sx={{ fontSize: 16 }}
                          color="text.secondary"
                          variant="body2"
                        >
                          {ticket.ticket_amount}
                        </Typography>
                      </Stack>
                      <Stack
                        direction={"row"}
                        justifyContent={"start"}
                        alignItems={"start"}
                        sx={{
                          height: "100%",
                        }}
                        gap={1}
                      >
                        <Typography
                          sx={{ fontSize: 16 }}
                          color="text.primary"
                          variant="body1"
                          fontWeight="bold"
                          gutterBottom
                        >
                          Fare Amount:
                        </Typography>
                        <Typography
                          sx={{ fontSize: 16 }}
                          color="text.secondary"
                          variant="body2"
                        >
                          {ticket.fare_amount}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Stack>
                </Card>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default TicketDetails;
