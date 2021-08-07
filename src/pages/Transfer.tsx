import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Container,
  Box,
  BoxProps,
  Button,
  List,
  ListItem,
  ListSubheader,
} from "@material-ui/core";
import { useSnackbar } from "notistack";

import { styled } from "@material-ui/core/styles";
import { useParams, useHistory } from "react-router-dom";

import DownloadIcon from "@material-ui/icons/CloudDownload";
import { retrieve } from "../web3storage";
import { Web3File } from "web3.storage";

interface TransferResponse {
  address: string;
  title: string;
  message: string;
  created: string;
  files: Web3File[];
}

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

function Transfer(): React.ReactElement {
  const [transfer, setTransfer] = useState<TransferResponse | null>(null);
  const params = useParams<{ id: string }>();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const handleClick = () => {
    console.log("DOWNLOAD");
  };

  const backToHome = () => {
    history.push("/");
  };

  useEffect(() => {
    async function retrieveFiles() {
      const files = await retrieve(params.id);
      console.log(files);
      if (!files) {
        enqueueSnackbar("Invalid Link!", { variant: "error" });
      } else {
        setTransfer({
          address: "",
          title: "Sweden",
          message: "Here are some images",
          created: new Date().toISOString(),
          files,
        });
      }
    }
    retrieveFiles();
  }, []);

  return (
    <Container maxWidth="sm">
      <ContentStyle>
        {transfer ? (
          <Card>
            <Typography variant="h4" color="initial">
              You&apos;ve got mail 📬
            </Typography>
            <Box p={3} style={{ borderRadius: 5, border: "1px solid white" }}>
              <Typography variant="subtitle1" color="initial">
                {transfer.title}
              </Typography>
              <Typography variant="caption">{transfer.message}</Typography>
            </Box>
            <List style={{ maxHeight: 280, overflowY: "auto" }}>
              {transfer.files.map((file) => (
                <ListItem key={file.name}>{file.name}</ListItem>
              ))}
            </List>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleClick}
            >
              Download {transfer.files.length}{" "}
              {transfer.files.length > 1 ? "files" : "file"}
            </Button>
          </Card>
        ) : (
          <Card>
            <Typography variant="h4" color="initial">
              Uh oh... This link seems to be broken 🤔
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={backToHome}
            >
              Back to home
            </Button>
          </Card>
        )}
      </ContentStyle>
    </Container>
  );
}

export default Transfer;
