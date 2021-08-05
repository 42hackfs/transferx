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

import { motion } from "framer-motion";
import {
  Card,
  Typography,
  Container,
  Box,
  BoxProps,
  Button,
  CardProps,
} from "@material-ui/core";
import { styled, Theme } from "@material-ui/core/styles";
import { Web3Storage } from "web3.storage";
import { AddFiles } from "./AddFiles";
import LoadingScreen from "./components/LoadingScreen";

const DivStyle = styled(motion.div)(({ theme }: { theme: Theme }) => ({
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  [theme.breakpoints.up("md")]: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    display: "flex",
    position: "fixed",
    alignItems: "center",
  },
}));

const ContentStyle = styled((props: BoxProps) => <Box {...props} />)(
  ({ theme }) => ({
    zIndex: 10,
    maxWidth: 520,
    margin: "auto",
    textAlign: "center",
    position: "relative",
    gap: 20,
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(15),
      paddingBottom: theme.spacing(15),
      margin: "unset",
      textAlign: "left",
      marginLeft: 20,
    },
  })
);

// const CardStyle = styled((props: CardProps) => <Card {...props} />)(
//   ({ theme }) => ({
//     position: "relative",
//     backgroundColor: "rgba(255, 255, 255, .10)",
//     backdropFilter: "blur(10px)",
//     WebkitBackdropFilter: "blur(10px)",
//     color: "white",
//     border: "1px solid white",
//     zIndex: 0, // Fix Safari overflow: hidden with border radius
//   })
// );

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
      <DivStyle>
        <Container maxWidth="md">
          <ContentStyle>
            <Card>
              {/* <Box
                p={3}
                display="flex"
                flexDirection="column"
                justifyContent="center"
              > */}
              <Typography variant="h4" color="primary">
                Connect your wallet
              </Typography>
              <Button variant="contained" color="primary">
                Connect
              </Button>
              {/* </Box> */}
            </Card>
            <AddFiles />
          </ContentStyle>
        </Container>
      </DivStyle>
    </ThemeConfig>
  );
}
