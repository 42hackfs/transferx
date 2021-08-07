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
import { useParams } from "react-router-dom";

import DownloadIcon from "@material-ui/icons/CloudDownload";
import { retrieve } from "../web3storage";

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
  const transfer = {
    address: "",
    title: "Sweden",
    message: "Here are some images",
    created: new Date().toISOString,
    files: [
      {
        lastModified: 157088592000,
        name: "2F12396A-4AEA-476A-B1BF-4FEC6EFBDD62.JPG",
        path: "2F12396A-4AEA-476A-B1BF-4FEC6EFBDD62.JPG",
        size: 847984,
        type: "image/jpeg",
      },
      {
        lastModified: 157088592000,
        name: "puppy.JPG",
        path: "puppy.JPG",
        size: 847984,
        type: "image/jpeg",
      },
    ],
  };
  // const [transfer, setTransfer] = useState(null);
  const params = useParams<{ id: string }>();

  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    console.log("DOWNLOAD");
  };

  useEffect(() => {
    async function retrieveFiles() {
      const files = await retrieve(params.id);
      console.log(files);
      if (!files) {
        enqueueSnackbar("Invalid Link!", { variant: "error" });
      }
    }
    retrieveFiles();
  }, []);

  return (
    <Container maxWidth="sm">
      <ContentStyle>
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
              <ListItem key={file.name}>file.name</ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClick}
          >
            Download {transfer.files?.length || 0} files
          </Button>
        </Card>
      </ContentStyle>
    </Container>
  );
}

export default Transfer;
