import React, { useState } from "react";
import {
  Card,
  Typography,
  Container,
  Box,
  BoxProps,
  Button,
} from "@material-ui/core";

import { Web3Storage } from "web3.storage";
import { authenticate } from "../ceramic";

import { styled, Theme } from "@material-ui/core/styles";
import Dropzone from "../components/Landing/Dropzone";
import DisplayLink from "../components/Landing/DisplayLink";

const ContentStyle = styled((props: BoxProps) => <Box {...props} />)(
  ({ theme }) => ({
    zIndex: 10,
    // width: 520,
    margin: "auto",
    textAlign: "center",
    // position: "relative",
    gap: 20,
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(15),
      paddingBottom: theme.spacing(15),
      margin: "unset",
      textAlign: "left",
      // marginLeft: 20,
    },
  })
);

function Landing(): React.ReactElement {
  const [address, setAddress] = useState<null | string>(null);
  const [id, setId] = useState<null | string>(null);

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
    <Container maxWidth="sm">
      <ContentStyle>
        {address ? (
          <Card>
            <Typography variant="h4">Connect your wallet</Typography>
            <Button variant="contained" color="primary" onClick={connectWallet}>
              Connect
            </Button>
          </Card>
        ) : !id ? (
          <Dropzone />
        ) : (
          <DisplayLink id={id || ""} />
        )}
      </ContentStyle>
    </Container>
  );
}

export default Landing;
