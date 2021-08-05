// routes
// import Router from "./routes";
// theme
import ThemeConfig from "./theme";
// hooks
// import useAuth from './hooks/useAuth';
// // components
// import RtlLayout from './components/RtlLayout';
// import ScrollToTop from './components/ScrollToTop';
// import LoadingScreen from './components/LoadingScreen';
// import GoogleAnalytics from './components/GoogleAnalytics';
// import NotistackProvider from './components/NotistackProvider';

// ----------------------------------------------------------------------
import React from "react";

import LoadingScreen from "./components/LoadingScreen";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

export default function App() {
  // const { isInitialized } = useAuth();

  return (
    <ThemeConfig>
      <Container maxWidth="md">
        <Typography variant="h1" color="primary">
          Connect your wallet
        </Typography>
      </Container>
    </ThemeConfig>
    //   <RtlLayout>
    //     <NotistackProvider>
    //       <GoogleAnalytics />
    //       {isInitialized ? <Router /> : <LoadingScreen />}
    //     </NotistackProvider>
    //   </RtlLayout>
  );
}
