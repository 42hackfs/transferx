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
import CryptoJS from "crypto-js";
import { authenticate } from "../ceramic";

interface TransferResponse {
  address: string;
  title: string;
  message: string;
  created: string;
  files: Web3File[];
  uploaderAddress: string;
  caip10Link: string;
}

interface ParsedData {
  schema: string;
  files: string;
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
  const [locked, setLocked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState<ParsedData | null>();
  const [content, setContent] = useState<TransferResponse | null>();
  const [buttonText, setButtonText] = useState("Unlock File");
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

  const unlockFile = () => {
    setButtonText("Unlocking...");
    authenticate()
      .then(async (idx) => {
        console.log("Connected to Ceramic:", idx.id);
        const address = Object.keys(
          (await idx.get("cryptoAccounts")) as any
        )[0].split("@")[0];
        if (address.toLowerCase() == transfer!.address!.toLowerCase()) {
          const status = await checkStatus(data!.files);
          const response = await retrieve(data!.files);

          if (status.dagSize) {
            setSize(formatBytes(status.dagSize));
          }

          if (!response.ok) {
            enqueueSnackbar("Invalid Link!", { variant: "error" });
          } else {
            setTransfer({
              address: "",
              title: content!.title,
              message: content!.message,
              created: new Date().toISOString(),
              files: [],
              uploaderAddress: content!.uploaderAddress,
              caip10Link: content!.caip10Link,
            });
          }
          setLoading(false);

          response.files().then((files: Web3File[]) => {
            setTransfer({
              address: "",
              title: content!.title,
              message: content!.message,
              created: new Date().toISOString(),
              files,
              uploaderAddress: content!.uploaderAddress,
              caip10Link: content!.caip10Link,
            });
          });

          setLocked(false);
        } else {
          setButtonText("Not authorized!");
        }
      })
      .catch((err) => {
        console.log(err);
        setLocked(false);
      });
  };

  const getFiles = async (content: any, data: any) => {
    const status = await checkStatus(data.files);
    const response = await retrieve(data.files);

    if (status.dagSize) {
      setSize(formatBytes(status.dagSize));
    }

    if (!response.ok) {
      enqueueSnackbar("Invalid Link!", { variant: "error" });
    } else {
      setTransfer({
        address: "",
        title: content.title,
        message: content.message,
        created: new Date().toISOString(),
        files: [],
        uploaderAddress: content.uploaderAddress,
        caip10Link: content.caip10Link,
      });
    }
    setLoading(false);

    response.files().then((files: Web3File[]) => {
      setTransfer({
        address: "",
        title: content.title,
        message: content.message,
        created: new Date().toISOString(),
        files,
        uploaderAddress: content.uploaderAddress,
        caip10Link: content.caip10Link,
      });
    });
  };

  useEffect(() => {
    async function retrieveFiles() {
      // Get the encoded URI
      const encrypted = decodeURI(params.id.replaceAll("*", "/"));
      const bytes = CryptoJS.AES.decrypt(encrypted, process.env.SECRET_KEY!);
      const jsonString = bytes.toString(CryptoJS.enc.Utf8);

      try {
        const data = JSON.parse(jsonString);
        setData(data);

        if (data.stream) {
          // Get ceramic stream
          const stream = await window.ceramic.loadStream(data.stream);
          const content = (stream as any).content;
          setContent(content);

          // First, we check if the stream has locked content
          if (content.recipientAddress != "") {
            setLocked(true);
            setTransfer({
              address: content.recipientAddress,
              title: "Locked",
              message: "Unlock to download",
              created: new Date().toISOString(),
              files: [],
              uploaderAddress: content.uploaderAddress,
              caip10Link: content.caip10Link,
            });

            setLoading(false);
          } else {
            await getFiles(content, data);
          }
        } else {
          await getFiles(
            {
              title: "Saturn",
              message: "P2P decentralized file sharing application",
              uploaderAddress: "",
              caip10Link: "",
            },
            data
          );
        }
      } catch (err) {
        console.log(err);
        enqueueSnackbar("Invalid Link!", { variant: "error" });

        setLoading(false);
      }
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
        ) : locked ? (
          <Backdrop
            open={true}
            style={{
              display: "flex",
              flexDirection: "column",
              zIndex: 1,
            }}
          >
            <Card>
              <Typography variant="h4" color="initial">
                This download is locked for {transfer?.address}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={unlockFile}
              >
                {buttonText}
              </Button>
            </Card>
          </Backdrop>
        ) : transfer ? (
          <Card>
            <Typography variant="h3" color="initial">
              You&apos;ve got mail 📬
            </Typography>
            <Box
              p={3}
              style={{
                borderRadius: 5,
                border: "1px solid white",
                wordBreak: "break-all",
              }}
            >
              <Typography variant="h4" color="initial">
                {transfer.title}
              </Typography>
              <Typography variant="subtitle1">{transfer.message}</Typography>
              <Typography variant="caption">
                {transfer.uploaderAddress}
              </Typography>
              <Typography variant="caption">{transfer.caip10Link}</Typography>
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
