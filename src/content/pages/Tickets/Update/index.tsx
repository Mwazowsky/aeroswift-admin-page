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

import useTicketForm from "../../../../hooks/pages/forms/ticket.hooks";
import { format } from "date-fns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function TicketUpdateForm() {
  const {
    formValues,
    loadingSubmit,
    handleUpdateSubmit,
    fetchTicketData,
    setFormValues,
  } = useTicketForm();

  useEffect(() => {
    fetchTicketData();
    console.log(formValues);
  }, [fetchTicketData]);

  return (
    <>
      <Helmet>
        <title>Update - AeroSwift Admin</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Update a Ticket"
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
              <CardHeader title="Ticket Details" />
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
                      name="flight-id"
                      label="Flight ID"
                      type="number"
                      value={formValues?.flight_id}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          flight_id: parseInt(e.target.value, 10),
                        })
                      }
                    />

                    <TextField
                      id="outlined-helperText"
                      name="ticket-type"
                      label="Ticket Class"
                      value={formValues?.ticket_type}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          ticket_type: e.target.value,
                        })
                      }
                    />

                    <TextField
                      id="outlined-helperText"
                      name="ticket-amount"
                      label="Ticket Amount"
                      type="number"
                      value={formValues?.ticket_amount}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          ticket_amount: parseInt(e.target.value, 10),
                        })
                      }
                    />

                    <TextField
                      id="outlined-helperText"
                      name="fare-amount"
                      label="Fare Amount/Price"
                      value={formValues?.fare_amount}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          fare_amount: e.target.value,
                        })
                      }
                    />

                    <Box>
                      <div>Available At: </div>
                      <DateTimePicker
                        value={
                          formValues?.valid_until
                            ? new Date(formValues.valid_until)
                            : null
                        }
                        onChange={(newValue: Date | null) => {
                          if (newValue) {
                            const formattedDateTime = format(
                              newValue,
                              "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
                            );
                            setFormValues({
                              ...formValues,
                              valid_until: formattedDateTime,
                            });
                          } else {
                            setFormValues({
                              ...formValues,
                              valid_until: "1999-12-08T17:00:00.000Z", // Or your default value when newValue is null
                            });
                          }
                        }}
                      />
                    </Box>
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

export default TicketUpdateForm;
