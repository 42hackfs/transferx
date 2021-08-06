import { Theme } from "@material-ui/core/styles";

// ----------------------------------------------------------------------

export default function TextField() {
  return {
    MuiTextField: {
      root: {
        "& fieldset": {
          borderColor: "white",
          borderWidth: 1,
        },
        "&:hover fieldset": {
          borderColor: "white",
          borderWidth: 1,
        },
        "&input:focus + fieldset": {
          borderColor: "white",
          borderWidth: 1,
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        MuiInputBase: {
          borderColor: "white",
          borderWidth: 1,
        },
      },
      // fieldset: {
      //   borderColor: "white",
      // },

      input: {
        color: "white",
        borderColor: "white",
      },
    },
    MuiInputLabel: {
      root: {
        color: "white",
      },
    },
  };
}
// <stop offset="0.0104167" stopColor="#36FEB3" />
//             <stop offset="0.447917" stopColor="#145ECE" />
//             <stop offset="0.760417" stopColor="#5E13DA" />
