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
  Box,
} from "@mui/material";

import Footer from "../../../../components/Footer";

import Typography from "@mui/material/Typography";

import useFlightDetails from "../../../../hooks/pages/details/flight.hooks";

function FlightDetails() {
  const { flight, fetchFlightData } = useFlightDetails();

  useEffect(() => {
    fetchFlightData();
  }, [fetchFlightData]);

  return (
    <>
      <Helmet>
        <title>Details - AeroSwift Admin</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Details"
          subHeading="Details page containing flight information."
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
              <CardHeader title={`Flight ID: ${flight.flight_id}`} />
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
                          Flight IATA:
                        </Typography>
                        <Typography
                          sx={{ fontSize: 16 }}
                          color="text.secondary"
                          variant="body2"
                        >
                          {flight.iata}
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
                          Flight Status:
                        </Typography>
                        <Typography
                          sx={{ fontSize: 16 }}
                          color="text.secondary"
                          variant="body2"
                        >
                          {flight.flight_status}
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
                          Flight Transit:
                        </Typography>
                        <Typography
                          sx={{ fontSize: 16 }}
                          color="text.secondary"
                          variant="body2"
                        >
                          {flight.transit}
                        </Typography>
                      </Stack>
                    </CardContent>
                    <CardContent>
                      <Box style={{ width: "100%", flex: "column" }}>
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
                            First Class Seat Total:
                          </Typography>
                          <Typography
                            sx={{ fontSize: 16 }}
                            color="text.secondary"
                            variant="body2"
                          >
                            {flight.first_seat}
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
                            Business Class Seat Total:
                          </Typography>
                          <Typography
                            sx={{ fontSize: 16 }}
                            color="text.secondary"
                            variant="body2"
                          >
                            {flight.business_seat}
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
                            Economy Class Seat Total:
                          </Typography>
                          <Typography
                            sx={{ fontSize: 16 }}
                            color="text.secondary"
                            variant="body2"
                          >
                            {flight.economy_seat}
                          </Typography>
                        </Stack>
                      </Box>
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

export default FlightDetails;
