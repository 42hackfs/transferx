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
} from "@material-ui/core";
import { styled, Theme } from "@material-ui/core/styles";

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

export default function App() {
  // const { isInitialized } = useAuth();

  return (
    <ThemeConfig>
      <DivStyle>
        <Container maxWidth="md">
          <ContentStyle>
            <Card>
              <Box
                p={3}
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Typography variant="h4" color="primary">
                  Connect your wallet
                </Typography>
                <Button variant="contained" color="primary">
                  Connect
                </Button>
              </Box>
            </Card>
          </ContentStyle>
        </Container>
      </DivStyle>
    </ThemeConfig>
  );
}
