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

import useDepartureDetails from "../../../../hooks/pages/details/departure.hooks";

function DepartureDetails() {
  const { departure, fetchDepartureData } = useDepartureDetails();

  useEffect(() => {
    fetchDepartureData();
  }, [fetchDepartureData]);

  return (
    <>
      <Helmet>
        <title>Details - AeroSwift Admin</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Details"
          subHeading="Details page containing car product information."
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
              <CardHeader title={`Departure ID: ${departure.departure_id}`} />
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
                    <CardContent sx={{
                      minWidth: '50%'
                    }}>
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
                          Departure Airport:
                        </Typography>
                        <Typography
                          sx={{ fontSize: 16 }}
                          color="text.secondary"
                          variant="body2"
                        >
                          {departure.airport_id}
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
                          Departure Terminal:
                        </Typography>
                        <Typography
                          sx={{ fontSize: 16 }}
                          color="text.secondary"
                          variant="body2"
                        >
                          {departure.terminal}
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
                          Departure Date:
                        </Typography>
                        <Typography
                          sx={{ fontSize: 16 }}
                          color="text.secondary"
                          variant="body2"
                        >
                          {departure.scheduled_time}
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

export default DepartureDetails;
