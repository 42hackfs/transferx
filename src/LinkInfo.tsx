import React from "react";
import { Typography } from "@material-ui/core";

export const LinkInfo = ({ id, reset }: { id: string; reset: () => void }) => {
  return (
    <Typography variant="h4" color="textPrimary">
      You re done!
    </Typography>
  );
};
