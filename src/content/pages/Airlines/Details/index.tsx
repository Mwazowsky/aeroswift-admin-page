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
  Box
} from "@mui/material";

import Footer from "../../../../components/Footer";

import Typography from "@mui/material/Typography";

import useAirlineDetails from "../../../../hooks/pages/details/airline.hooks";

function AirlineDetails() {
  const { airline, fetchAirlineData } = useAirlineDetails();

  useEffect(() => {
    fetchAirlineData();
  }, [fetchAirlineData]);

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
              <CardHeader title={`Airline ID: ${airline.airline_id}`} />
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
                          Airline Name:
                        </Typography>
                        <Typography
                          sx={{ fontSize: 16 }}
                          color="text.secondary"
                          variant="body2"
                        >
                          {airline.name}
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
                          Airline IATA Code:
                        </Typography>
                        <Typography
                          sx={{ fontSize: 16 }}
                          color="text.secondary"
                          variant="body2"
                        >
                          {airline.iata}
                        </Typography>
                      </Stack>
                    </CardContent>
                    <CardContent>
                      <Box style={{ width: "100%" }}>
                        <img
                          src={airline.image}
                          alt="preview"
                          style={{ width: "100%", objectFit: "cover" }}
                        />
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

export default AirlineDetails;
