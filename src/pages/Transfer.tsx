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
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { useSnackbar } from "notistack";

import { styled, Theme } from "@material-ui/core/styles";
import { useParams, useHistory } from "react-router-dom";

import DownloadIcon from "@material-ui/icons/CloudDownload";
import { retrieve, checkStatus } from "../web3storage";
import { Web3File } from "web3.storage";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { makeStyles } from "@material-ui/styles";
import crypto from "crypto-js";

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

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    display: "flex",
    flexDirection: "column",
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function Transfer(): React.ReactElement {
  const [transfer, setTransfer] = useState<TransferResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [size, setSize] = useState("");
  const params = useParams<{ id: string }>();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const zip = new JSZip();
  const classes = useStyles();

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleClick = () => {
    setLoading(true);
    for (const file of transfer!.files) {
      zip.file(file.name, file.arrayBuffer());
    }
    zip
      .generateAsync({ type: "blob", streamFiles: true }, (metadata: any) => {
        setProgress(metadata.percent);
      })
      .then(function (content: any) {
        saveAs(content, `${transfer?.title}.zip`);
      });
  };

  const backToHome = () => {
    history.push("/");
  };

  useEffect(() => {
    async function retrieveFiles() {
      const encrypted = decodeURI(params.id);
      const bytes = crypto.AES.decrypt(encrypted, process.env.SECRET_KEY!);
      const jsonString = bytes.toString(CryptoJS.enc.Utf8);
      const data = JSON.parse(jsonString);

      console.log(data);
      // const stream = await window.ceramic.loadStream(streamId);
      // console.log("STRAEM", stream);
      const response = await retrieve(data.files);
      const status = await checkStatus(data.files);

      if (status.dagSize) {
        setSize(formatBytes(status.dagSize));
      }

      if (!response.ok) {
        enqueueSnackbar("Invalid Link!", { variant: "error" });
      } else {
        setTransfer({
          address: "",
          title: "Sweden",
          message: "Here are some images",
          created: new Date().toISOString(),
          files: [],
        });
      }
      setLoading(false);

      response.files().then((files: Web3File[]) => {
        setTransfer({
          address: "",
          title: "Sweden",
          message: "Here are some images",
          created: new Date().toISOString(),
          files,
        });
      });
    }

    if (progress <= 0) {
      retrieveFiles();
    }

    if (progress >= 100) {
      setLoading(false);
    }
  }, [progress]);

  return (
    <Container maxWidth="sm">
      <ContentStyle>
        {loading ? (
          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
            {progress > 0 ? (
              <h1
                style={{ color: "white", marginTop: "1rem" }}
              >{`Zipping... ${progress.toFixed(2)}% complete`}</h1>
            ) : null}
          </Backdrop>
        ) : transfer ? (
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
            {transfer.files.length == 0 ? (
              <div>
                File metadata loading from IPFS...{" "}
                <CircularProgress
                  color="inherit"
                  style={{ width: "16px", height: "16px", marginRight: "1rem" }}
                />
                {size != "" ? <i> Estimated file size ~ {size}</i> : null}
              </div>
            ) : (
              <List style={{ maxHeight: 280, overflowY: "auto" }}>
                {transfer.files.map((file) => (
                  <ListItem key={file.name}>{file.name}</ListItem>
                ))}
              </List>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleClick}
              disabled={transfer.files.length < 1}
            >
              Download zip file
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
