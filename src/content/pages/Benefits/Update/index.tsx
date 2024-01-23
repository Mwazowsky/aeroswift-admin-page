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

import useBenefitForm from "../../../../hooks/pages/forms/benefit.hooks";

function BenefitUpdateForm() {
  const {
    fetchBenefitData,
    handleUpdateSubmit,
    setFormValues,
    formValues,
    loadingSubmit,
  } = useBenefitForm();

  useEffect(() => {
    fetchBenefitData();
  }, [fetchBenefitData]);

  return (
    <>
      <Helmet>
        <title>Update - AeroSwift Admin</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Update a Car"
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
              <CardHeader title="Benefit Details" />
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
                      name="benefit-flight-id"
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
                      name="airline-name"
                      label="Airline Name"
                      value={formValues?.name}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          name: e.target.value,
                        })
                      }
                    />
                    <TextField
                      id="outlined-input"
                      name="iata-code"
                      label="Airline IATA Code"
                      value={formValues?.detail}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          detail: e.target.value,
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

export default BenefitUpdateForm;
