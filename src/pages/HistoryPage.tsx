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
interface TransferResponse {
  address: string;
  title: string;
  message: string;
  created: string;
  files: Web3File[];
}

interface UploadList {
  arrayFiles: { title: string }[];
}

const objectList = {
  arrayFiles: [{ title: "file1" }, { title: "file2" }, { title: "file3" }],
};

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

const DivStyle = styled("div")(({ theme }: { theme: Theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "5px 10px",
  border: "1px solid white",
  width: "100%",
  borderRadius: 5,
  gap: 10,
  "&:hover": {
    border: "1px solid black",
    cursor: "pointer",
  },
}));

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    display: "flex",
    flexDirection: "column",
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function HistoryPage(): React.ReactElement {
  const [uploadList, setUploadList] = useState<UploadList | null>(null);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const history = useHistory();
  const backToHome = () => {
    history.push("/");
  };

  useEffect(() => {
    async function retrieveIDX() {
      const idx = window.idx;
      const fileList = await idx.get("FilesList");
      const cryptoAccounts = await idx.get("cryptoAccounts");
      const Transferx = await idx.get("Transferx");
      console.log("crypto", cryptoAccounts);
      console.log("Transferx:", Transferx);
      console.log("filelist:", fileList);
      // setUploadList(objectList);
      setUploadList(null);
      // console.log("uploadlist", uploadList);
      setLoading(false);
    }
    retrieveIDX();
  }, []);
  return (
    <Container maxWidth="sm">
      <ContentStyle>
        <Card>
          <Typography variant="h4" color="initial">
            History of your uploaded files
          </Typography>

          {loading ? (
            <Backdrop className={classes.backdrop} open={loading}>
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : uploadList ? (
            <List style={{ maxHeight: 280, overflowY: "auto" }}>
              {uploadList?.arrayFiles.map((file: any) => (
                <ListItem key={file.title}>
                  <DivStyle>
                    <Box p={1}>
                      <Typography variant="subtitle1" color="initial">
                        {file.title}
                      </Typography>
                      <Typography variant="caption">link</Typography>
                    </Box>
                  </DivStyle>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="h6" color="initial">
              How dare you coming here without doing a single upload? Of course
              you don&apos;t have a history. What did you think? GET OUT OF
              HERE!
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={backToHome}
          >
            Back to home
          </Button>
        </Card>
      </ContentStyle>
    </Container>
  );
}

export default HistoryPage;
