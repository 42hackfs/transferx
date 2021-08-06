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
import React, { useState } from "react";

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
import { authenticate } from "./ceramic";
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

export default function App() {
  // const { isInitialized } = useAuth();
  const [address, setAddress] = useState("");

  const connectWallet = () => {
    authenticate().then(
      (id) => {
        console.log("Connected with DID:", id);
        const address = id.split(":")[2];
        const croppedAddress =
          address.substr(0, 17) +
          "..." +
          address.substr(address.length - 17, address.length);
        setAddress(croppedAddress);
      },
      (err) => {
        console.error("Failed to authenticate:", err);
        setAddress("");
      }
    );
  };

  return (
    <ThemeConfig>
      <DivStyle>
        <Container maxWidth="md">
          <ContentStyle>
            {address == "" ? (
              <Card>
                <Typography variant="h4">Connect your wallet</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={connectWallet}
                >
                  Connect
                </Button>
              </Card>
            ) : (
              <Card>
                <Typography variant="h4">Connected with {address}!</Typography>
              </Card>
            )}
            <AddFiles />
          </ContentStyle>
        </Container>
      </DivStyle>
    </ThemeConfig>
  );
}
