import { Helmet } from "react-helmet-async";
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

function BenefitCreateForm() {
  const {
    handleSubmit,
    setFormValues,
    formValues,
    loadingSubmit,
  } = useBenefitForm();

  return (
    <>
      <Helmet>
        <title>Create - AeroSwift Admin</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Create New Benefit"
          subHeading="Pastikan setiap field pada kolom input terisi."
          docs="/management/products"
          actionElement={
            <form onSubmit={handleSubmit}>
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
                    display: "flex"
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
                      name="flight-id"
                      label="Flight ID"
                      type="number"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          flight_id: parseInt(e.target.value, 10),
                        })
                      }
                      value={formValues?.flight_id}
                    />
                    <TextField
                      id="outlined-helperText"
                      name="benefit-name"
                      label="Benefit Name"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          name: e.target.value,
                        })
                      }
                      value={formValues?.name}
                    />
                    <TextField
                      id="outlined-input"
                      name="benefit-detail"
                      label="Benefit Detail"
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

export default BenefitCreateForm;
