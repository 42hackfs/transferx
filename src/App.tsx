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
import { Web3Storage } from "web3.storage";

function getAccessToken() {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBEZkFlODM5QzllMDE0ZTVkN2VBNjQ3RkIxQ2Q3ZjZkOUEwN2M1ZTUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MjgwMTAyOTI1OTMsIm5hbWUiOiJtYXRoaXMifQ.DKiUfTgLAUufFweDwZiJKqvS1vdBD3_-sd4c3-mUCaY";

  // In a real app, it's better to read an access token from an
  // environement variable or other configuration that's kept outside of
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  //   return process.env.WEB3STORAGE_TOKEN;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

export default function App() {
  // const { isInitialized } = useAuth();
  console.log(makeStorageClient());
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
