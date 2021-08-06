import React, { Suspense, lazy } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {
  Navigate,
  useRoutes,
  useLocation,
  Switch,
  Route,
  BrowserRouter,
  Redirect,
} from "react-router-dom";
// layouts
import MainLayout from "../layouts/MainLayout";
import LogOnlyLayout from "../layouts/LogOnlyLayout";

// guards
// import GuestGuard from "../guards/GuestGuard";
// import AuthGuard from "../guards/AuthGuard";
// components
import LoadingScreen from "../components/LoadingScreen";
import Landing from "../pages/Landing";
import Transfer from "../pages/Transfer";

// ----------------------------------------------------------------------

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/transfer/:id">
          <Transfer />
        </Route>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

// IMPORT COMPONENTS

// Authentication
// const Login = Loadable(lazy(() => import("../pages/authentication/Login")));
// const Register = Loadable(
//   lazy(() => import("../pages/authentication/Register"))
// );
// const ResetPassword = Loadable(
//   lazy(() => import("../pages/authentication/ResetPassword"))
// );
// const VerifyCode = Loadable(
//   lazy(() => import("../pages/authentication/VerifyCode"))
// );
// Main
// const LandingPage = Loadable(lazy(() => import("../pages/Landing")));
// const TransferPage = Loadable(lazy(() => import("../pages/Landing")));
// const About = Loadable(lazy(() => import("../pages/About")));
// const Contact = Loadable(lazy(() => import("../pages/Contact")));
// const Faqs = Loadable(lazy(() => import("../pages/Faqs")));
// const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
// const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
// const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
// const Payment = Loadable(lazy(() => import('../pages/Payment')));
// const Page500 = Loadable(lazy(() => import("../pages/Page500")));
// const NotFound = Loadable(lazy(() => import("../pages/Page404")));
