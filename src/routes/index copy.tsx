import React, { Suspense, lazy } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Navigate, useRoutes, useLocation } from "react-router-dom";
// layouts
import MainLayout from "../layouts/MainLayout";
import LogOnlyLayout from "../layouts/LogOnlyLayout";

// guards
// import GuestGuard from "../guards/GuestGuard";
// import AuthGuard from "../guards/AuthGuard";
// components
import LoadingScreen from "../components/LoadingScreen";

// ----------------------------------------------------------------------

// eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
const Loadable = (Component: any) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes("/dashboard");

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: "fixed",
            }),
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    // {
    //   path: "auth",
    //   children: [
    //     {
    //       path: "login",
    //       element: (
    //         <GuestGuard>
    //           <Login />
    //         </GuestGuard>
    //       ),
    //     },
    //     {
    //       path: "register",
    //       element: (
    //         <GuestGuard>
    //           <Register />
    //         </GuestGuard>
    //       ),
    //     },
    //     { path: "login-unprotected", element: <Login /> },
    //     { path: "register-unprotected", element: <Register /> },
    //     { path: "reset-password", element: <ResetPassword /> },
    //     { path: "verify", element: <VerifyCode /> },
    //   ],
    // },

    // Main Routes
    {
      path: "*",
      element: <LogOnlyLayout />,
      children: [
        // { path: 'coming-soon', element: <ComingSoon /> },
        // { path: 'maintenance', element: <Maintenance /> },
        // { path: 'pricing', element: <Pricing /> },
        // { path: 'payment', element: <Payment /> },
        { path: "500", element: <Page500 /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <LandingPage /> },
        // { path: "/link/:id", element: <LandingPaymentSend /> },
        // { path: "/link/:id/dashboard", element: <DashboardLinkPage /> },
        { path: "payment", element: <LandingPage /> },
        // { path: "about-us", element: <About /> },
        // { path: "contact-us", element: <Contact /> },
        // { path: "faqs", element: <Faqs /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
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
const LandingPage = Loadable(lazy(() => import("../pages/Landing")));
// const TransferPage = Loadable(lazy(() => import("../pages/Landing")));
// const About = Loadable(lazy(() => import("../pages/About")));
// const Contact = Loadable(lazy(() => import("../pages/Contact")));
// const Faqs = Loadable(lazy(() => import("../pages/Faqs")));
// const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
// const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
// const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
// const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Page500 = Loadable(lazy(() => import("../pages/Page500")));
const NotFound = Loadable(lazy(() => import("../pages/Page404")));
