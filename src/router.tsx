import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { RouteObject } from "react-router";
import SidebarLayout from "src/layouts/SidebarLayout";
import PrivateProvider from "./providers/PrivateProvider";
import PublicProvider from "./providers/PublicProvider";
import Loader from "./Loader";

const Login = Loader(lazy(() => import("src/content/pages/Login")));
const Register = Loader(lazy(() => import("src/content/pages/Register")));

const Airlines = Loader(lazy(() => import("src/content/applications/Airlines")));
const AirlineCreateForm = Loader(lazy(() => import("src/content/pages/Airlines/Create/index")));
const AirlineUpdateForm = Loader(lazy(() => import("src/content/pages/Airlines/Update/index")));
const AirlineDetails = Loader(lazy(() => import("src/content/pages/Airlines/Details")));

const Flights = Loader(lazy(() => import("src/content/applications/Flights")));
const FlightCreateForm = Loader(lazy(() => import("src/content/pages/Flights/Create/index")));
const FlightUpdateForm = Loader(lazy(() => import("src/content/pages/Flights/Update/index")));
const FlightDetails = Loader(lazy(() => import("src/content/pages/Flights/Details")));

const Benefits = Loader(lazy(() => import("src/content/applications/Benefits")));
const BenefitCreateForm = Loader(lazy(() => import("src/content/pages/Benefits/Create/index")));
const BenefitUpdateForm = Loader(lazy(() => import("src/content/pages/Benefits/Update/index")));
const BenefitDetails = Loader(lazy(() => import("src/content/pages/Benefits/Details")));

const routes: RouteObject[] = [
  {
    path: "",
    element: <Navigate to="login" replace />,
  },
  {
    path: "management",
    element: (
      <PrivateProvider>
        <SidebarLayout />
      </PrivateProvider>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="airlines" replace />,
      },
      {
        path: "airlines",
        element: <Airlines />
      },
      {
        path: "flights",
        element: <Flights />
      },
      {
        path: "benefits",
        element: <Benefits />
      },
    ],
  },

  {
    path: "/management/airlines",
    element: (
      <PrivateProvider>
        <SidebarLayout />
      </PrivateProvider>
    ),
    children: [
      {
        path: "create",
        element: <AirlineCreateForm />,
      },
      {
        path: "update/:airline_id",
        element: <AirlineUpdateForm />,
      },
      {
        path: "details/:airline_id",
        element: <AirlineDetails />,
      },
    ],
  },
  {
    path: "/management/flights",
    element: (
      <PrivateProvider>
        <SidebarLayout />
      </PrivateProvider>
    ),
    children: [
      {
        path: "create",
        element: <FlightCreateForm />,
      },
      {
        path: "update/:flight_id",
        element: <FlightUpdateForm />,
      },
      {
        path: "details/:flight_id",
        element: <FlightDetails />,
      },
    ],
  },
  {
    path: "/management/benefits",
    element: (
      <PrivateProvider>
        <SidebarLayout />
      </PrivateProvider>
    ),
    children: [
      {
        path: "create",
        element: <BenefitCreateForm />,
      },
      {
        path: "update/:benefit_id",
        element: <BenefitUpdateForm />,
      },
      {
        path: "details/:benefit_id",
        element: <BenefitDetails />,
      },
    ],
  },



  {
    path: "login",
    element: (
      <PublicProvider>
        <Login />
      </PublicProvider>
    ),
  },
  {
    path: "register",
    element: (
      <PublicProvider>
        <Register />
      </PublicProvider>
    ),
  },
];

export default routes;
