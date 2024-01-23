import { FormEvent, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Container,
  Divider,
  Button,
  FormControl,
  TextField,
  Alert,
} from "@mui/material";
import { Helmet } from "react-helmet-async";

import { useLoginForm } from "../../../hooks/pages/login.hooks";

import { styled } from "@mui/material/styles";

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

function Login() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const { handleSubmit, alert } = useLoginForm();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      handleSubmit(email, password);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - AeroSwift Admins</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Container maxWidth="sm">
            <Card sx={{ textAlign: "center", mt: 3, p: 4 }}>
              <Box textAlign="center">
                <img
                  alt="404"
                  height={180}
                  src="/static/images/status/404.svg"
                />
                <Typography variant="h2" sx={{ my: 2 }}>
                  Login
                </Typography>
              </Box>
              <div
                style={{
                  width: "100%",
                }}
              >
                {alert && alert.message && (
                  <Alert severity={alert.severity}>{alert.message}</Alert>
                )}
                <form onSubmit={handleFormSubmit}>
                  <FormControl
                    sx={{
                      "& .MuiTextField-root": { m: 1 },
                    }}
                    variant="outlined"
                    fullWidth
                  >
                    <TextField
                      type="text"
                      label="Email"
                      placeholder="Your Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      type="password"
                      label="Password"
                      placeholder="Your Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        alignContent: "center",
                        alignSelf: "center",
                        width: "35%",
                      }}
                    >
                      Login
                    </Button>
                  </FormControl>
                </form>
              </div>
              <Divider sx={{ my: 4 }}>OR</Divider>
              <Button
                href="/register"
                variant="outlined"
                sx={{
                  alignContent: "center",
                  alignSelf: "center",
                  width: "35%",
                }}
              >
                Register
              </Button>
            </Card>
          </Container>
        </Container>
      </MainContent>
    </>
  );
}

export default Login;
