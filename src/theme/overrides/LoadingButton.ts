import { Theme } from "@material-ui/core/styles";

// ----------------------------------------------------------------------

export default function LoadingButton() {
  return {
    MuiLoadingButton: {
      root: {
        "&.MuiButton-text": {
          "& .MuiLoadingButton-startIconPendingStart": {
            marginLeft: 0,
          },
          "& .MuiLoadingButton-endIconPendingEnd": {
            marginRight: 0,
          },
        },
      },
    },
  };
}
