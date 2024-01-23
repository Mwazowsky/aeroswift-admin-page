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

import { CloudUpload } from "@mui/icons-material";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

import { VisuallyHiddenInput } from "./updateForm.styled";
import useAirlineForm from "../../../../hooks/pages/forms/airline.hooks";

function AirlineUpdateForm() {
  const {
    fetchAirlineData,
    handleUpdateSubmit,
    handleUploadCover,
    setFormValues,
    formValues,
    loadingCover,
    loadingSubmit,
    fileItem,
  } = useAirlineForm();

  useEffect(() => {
    fetchAirlineData();
  }, [fetchAirlineData]);

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
              <CardHeader title="Airlines Details" />
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
                      value={formValues?.iata}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          iata: e.target.value,
                        })
                      }
                    />
                  </Box>
                  <Box
                    sx={{
                      flex: "1",
                      alignItems: "center",
                      alignContent: "center",
                      "& .MuiTextField-root": { m: 1, width: "45%" },
                    }}
                  >
                    <LoadingButton
                      component="label"
                      variant="contained"
                      startIcon={<CloudUpload />}
                      sx={{ mb: 3 }}
                      loading={loadingCover}
                    >
                      Upload Airline Logo
                      <VisuallyHiddenInput
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleUploadCover}
                      />
                    </LoadingButton>
                    {formValues && formValues.image && (
                      <Box>
                        <img
                          src={
                            fileItem ? fileItem.secure_url : formValues.image
                          }
                          alt="preview"
                          style={{ width: "100%", objectFit: "cover" }}
                        />
                      </Box>
                    )}
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

export default AirlineUpdateForm;
