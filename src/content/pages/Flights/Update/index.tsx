import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import PageTitle from "../../../../components/PageTitle";
import PageTitleWrapper from "../../../../components/PageTitleWrapper";
import Footer from "../../../../components/Footer";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

import useFlightForm from "../../../../hooks/pages/forms/flight.hooks";

function FlightUpdateForm() {
  const {
    formValues,
    loadingSubmit,
    handleUpdateSubmit,
    fetchFlightData,
    setFormValues,
  } = useFlightForm();

  useEffect(() => {
    fetchFlightData();
    console.log(formValues);
  }, [fetchFlightData]);

  return (
    <>
      <Helmet>
        <title>Update - AeroSwift Admin</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Update a Flight"
          subHeading="Pastikan setiap field pada kolom input terisi"
          docs="/management/products"
          actionElement={
            <form onSubmit={handleUpdateSubmit}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={loadingSubmit}
                startIcon={<AddTwoToneIcon fontSize="small" />}
              >
                Submit
              </LoadingButton>
            </form>
          }
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
              <CardHeader title="Flight Details" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Box
                    sx={{
                      flex: "1", // Adjusted to take up remaining space equally
                      "& .MuiTextField-root": { m: 1 },
                    }}
                  >
                    <TextField
                      id="outlined-helperText"
                      name="departure-airport-id"
                      label="Departure Airport"
                      type="number"
                      value={formValues?.departure_id}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          departure_id: parseInt(e.target.value, 10),
                        })
                      }
                    />

                    <TextField
                      id="outlined-helperText"
                      name="arrival-airport-id"
                      label="Arrival Airport"
                      type="number"
                      value={formValues?.arrival_id}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          arrival_id: parseInt(e.target.value, 10),
                        })
                      }
                    />

                    <TextField
                      id="outlined-helperText"
                      name="airline-id"
                      label="Airline"
                      type="number"
                      value={formValues?.airline_id}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          airline_id: parseInt(e.target.value, 10),
                        })
                      }
                    />

                    <TextField
                      id="outlined-helperText"
                      name="transit"
                      label="Transit Total"
                      type="number"
                      value={formValues?.transit}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          transit: parseInt(e.target.value, 10),
                        })
                      }
                    />
                    
                    <TextField
                      id="outlined-helperText"
                      name="first-seat-total"
                      label="First Seat Total"
                      type="number"
                      value={formValues?.first_seat}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          first_seat: parseInt(e.target.value, 10),
                        })
                      }
                    />
                    <TextField
                      id="outlined-helperText"
                      name="business-seat-total"
                      label="business Seat Total"
                      type="number"
                      value={formValues?.business_seat}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          business_seat: parseInt(e.target.value, 10),
                        })
                      }
                    />
                    <TextField
                      id="outlined-helperText"
                      name="economy-seat-total"
                      label="Economy Seat Total"
                      type="number"
                      value={formValues?.economy_seat}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          economy_seat: parseInt(e.target.value, 10),
                        })
                      }
                    />

                    <TextField
                      id="outlined-input"
                      name="flight-status"
                      label="Flight Status"
                      value={formValues?.flight_status}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          flight_status: e.target.value,
                        })
                      }
                    />
                    <TextField
                      id="outlined-input"
                      name="flight-number"
                      label="Flight Number"
                      value={formValues?.flight_number}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          flight_number: e.target.value,
                        })
                      }
                    />
                    <TextField
                      id="outlined-input"
                      name="flight-iata-code"
                      label="Flight IATA Code"
                      value={formValues?.iata}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          iata: e.target.value,
                        })
                      }
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default FlightUpdateForm;
