import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface IUseLoginForm {
  handleSubmit: (email: string, password: string) => Promise<void>;
  alert: IAlert | undefined;
}

interface IAlert {
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

export function useLoginForm(): IUseLoginForm {
  const [alert, setAlert] = useState<IAlert>();
  const navigate = useNavigate();

  const handleSubmit = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "https://backend-java-production-ece2.up.railway.app/api/v1/auth/login",
        {
          emailAddress: email,
          password: password
        }
      );

      const { token, roles } = response.data;

      if (token && roles[0] === "ADMIN") {
        localStorage.setItem("token", `Bearer ${token}`);

        setAlert({
          message: "Login success!",
          severity: "success",
        });

        navigate("/management/products");
      } else {
        setAlert({
          message: "You're not permitted to access this page, Not an admin!",
          severity: "error",
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return setAlert({
          message: error?.response?.data?.message || "An error occurred",
          severity: "error",
        });
      }
      setAlert({
        message: "Failed",
        severity: "error",
      });
    }
  };

  return { handleSubmit, alert };
}
