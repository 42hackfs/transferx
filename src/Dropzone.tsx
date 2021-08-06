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
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/AddCircleOutline";
import CloseIcon from "@material-ui/icons/Close";

function Dropzone(): React.ReactElement {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles[0].name);

    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (index: number) => () => {
    setFiles((prev) => prev.filter((_, i) => index !== i));
  };

  return (
    <Card style={{ maxHeight: 600 }}>
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
            <Typography variant="h4">Drop it like it&apos;s hot...</Typography>
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
          <Box
            px={3}
            py={1}
            sx={{ border: "1px solid white", borderRadius: 5 }}
            display="flex"
            alignItems="center"
          >
            <AddIcon />
            <div
              {...getRootProps()}
              style={{
                textAlign: "left",
                paddingLeft: 20,
                cursor: "pointer",
              }}
            >
              <Typography variant="subtitle1" color="initial">
                {files.length > 0 ? "Add more files" : "Choose files"}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {files.length} files added
              </Typography>
            </div>
          </Box>
          <Button variant="contained" color="primary" fullWidth>
            Upload
          </Button>
        </>
      )}
    </Card>
  );
}
export default Dropzone;
