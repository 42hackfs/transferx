import React from "react";
import { useSnackbar } from "notistack";

import { Typography, Button, Card, Tooltip } from "@material-ui/core";

import CopyIcon from "@material-ui/icons/FileCopyOutlined";
import CheckIcon from "@material-ui/icons/CheckCircle";
import { styled, Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

const DivStyle = styled("div")(({ theme }: { theme: Theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px 30px",
  border: "1px solid white",
  borderRadius: 5,
  //   gap: 20,
  "&:hover": {
    border: "1px solid black",
    cursor: "pointer",
  },
}));

const useStyles = makeStyles((theme: Theme) => ({
  copyIcon: {
    marginLeft: "12px",
  },
}));

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard";

function DisplayLink({
  id,
  setId,
}: {
  id: string;
  setId: any;
}): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  const onCopy = () => {
    enqueueSnackbar("Copied Link", { variant: "success" });
  };

  return (
    <Card style={{ alignItems: "center", padding: "40px 20px" }}>
      <CheckIcon fontSize="large" />
      <Typography variant="h4" color="initial">
        Your transfer link has been created!
      </Typography>
      <CopyToClipboard
        text={
          process.env.NODE_ENV == "development"
            ? `http://localhost:4000/#/transfer/${id}`
            : `${process.env.REACT_APP_TRANSFER_URL}/${id}`
        }
        onCopy={onCopy}
      >
        <Tooltip title="Copy Link">
          <DivStyle>
            <Typography variant="h6" component="h2" gutterBottom>
              saturn.eth/hackfs
            </Typography>
            <CopyIcon color="inherit" className={classes.copyIcon} />
          </DivStyle>
        </Tooltip>
      </CopyToClipboard>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => setId("")}
      >
        Create A New Transfer
      </Button>
    </Card>
  );
}

export default DisplayLink;
