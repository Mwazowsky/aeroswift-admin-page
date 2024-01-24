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

import useArrivalForm from "../../../../hooks/pages/forms/arrival.hooks";

function ArrivalUpdateForm() {
  const {
    fetchArrivalData,
    handleUpdateSubmit,
    setFormValues,
    formValues,
    loadingSubmit,
  } = useArrivalForm();

  useEffect(() => {
    fetchArrivalData();
  }, [fetchArrivalData]);

  return (
    <>
      <Helmet>
        <title>Update - AeroSwift Admin</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Update a Arrival"
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
              <CardHeader title="Arrival Details" />
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
                      flex: "1",
                      display: "flex",
                      flexDirection: "column",
                      "& .MuiTextField-root": { m: 1 },
                    }}
                  >
                    <TextField
                      id="outlined-helperText"
                      name="arrival-airport"
                      label="Arrival Airport"
                      placeholder="Input arrival airport ID ..."
                      type="number"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          airport_id: parseInt(e.target.value),
                        })
                      }
                      value={formValues?.airport_id}
                    />
                    <TextField
                      id="outlined-helperText"
                      name="arrival-terminal"
                      label="Arrival Terminal"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          terminal: e.target.value,
                        })
                      }
                      value={formValues?.terminal}
                      />
                    <TextField
                      id="outlined-input"
                      name="scheduled-time"
                      label="Arrival Scheduled Time"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          scheduled_time: e.target.value,
                        })
                      }
                      value={formValues?.scheduled_time}
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

export default ArrivalUpdateForm;
