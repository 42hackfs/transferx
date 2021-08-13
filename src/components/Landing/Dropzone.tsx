import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemSecondaryAction,
  Card,
  IconButton,
  TextField,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { styled, Theme } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/AddCircleOutline";
import CloseIcon from "@material-ui/icons/Close";
import { storeWithProgress } from "../../web3storage";
import { makeStyles } from "@material-ui/styles";
import { useSnackbar } from "notistack";

import type { CeramicApi } from "@ceramicnetwork/common";
import { createStream } from "../../ceramic/stream";
import { getCryptoAccount } from "../../ceramic/idx";

const DivStyle = styled("div")(({ theme }: { theme: Theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "20px 30px",
  border: "1px solid white",
  borderRadius: 5,
  gap: 20,
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

declare const process: {
  env: {
    CERAMIC_SCHEMA_TRANSFERX: string;
  };
};

function Dropzone({ setId }: { setId: any }): React.ReactElement {
  const classes = useStyles();
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("Uploading... 0.00% complete");

  const { enqueueSnackbar } = useSnackbar();

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles[0].name);

    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (index: number) => () => {
    setFiles((prev) => prev.filter((_, i) => index !== i));
  };

  const handleSubmit = async () => {
    console.log("Submit:", { files, title, message });
    setLoading(true);
    try {
      const id = await storeWithProgress(files, setProgress);
      /* const ceramic: CeramicApi = window.ceramic; */
      /* console.log('mmh ceramic', ceramic); */
      const caip10link = await getCryptoAccount();

      const ethAddress = Object.keys(caip10link)[0];
      const stream = await createStream(
        window.ceramic,
        {
          CID: id,
          title,
          message,
          caip10Link: caip10link[ethAddress],
          uploaderAddress: ethAddress,
        },
        process.env.CERAMIC_SCHEMA_TRANSFERX,
        [window.idx!.id]
      );

      setId(id);
    } catch (error) {
      console.log(error);
      enqueueSnackbar("No files uploaded!", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Card>
        <input {...getInputProps()} />
        {isDragActive ? (
          <div {...getRootProps()}>
            <Box
              height={400}
              width={400}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h4">Drop your files here.</Typography>
            </Box>
          </div>
        ) : (
          <>
            <Typography variant="h5">Upload your files</Typography>
            {files.length > 0 && (
              <Box>
                <ListSubheader color="inherit">Files</ListSubheader>
                <List style={{ maxHeight: 280, overflowY: "auto" }}>
                  {files.map((file, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={file.name}
                        style={{ overflow: "hidden" }}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={removeFile(index)}
                        >
                          <CloseIcon color="primary" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
            <DivStyle {...getRootProps()}>
              <AddIcon />
              <div>
                <Typography variant="subtitle1" color="initial">
                  {files.length > 0 ? "Add more files" : "Choose files"}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {files.length} files added
                </Typography>
              </div>
            </DivStyle>
            <div
              style={{
                gap: 20,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
              <TextField
                id="message"
                label="Message"
                multiline
                variant="outlined"
                value={message}
                onChange={({ target }) => setMessage(target.value)}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
            >
              Transfer
            </Button>
          </>
        )}
      </Card>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
        <h1 style={{ color: "white", marginTop: "1rem" }}>{progress}</h1>
      </Backdrop>
    </div>
  );
}
export default Dropzone;
