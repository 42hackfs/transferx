import { Theme } from "@material-ui/core/styles";

// ----------------------------------------------------------------------

export default function Button() {
  return {
    MuiButton: {
      root: {
        "&:hover": {
          boxShadow: "none",
        },
      },
      sizeLarge: {
        height: 48,
      },
      containedInherit: {
        backgroundImage:
          "linear-gradient(to right, #36FEB3 0%,#5E23DA 51%, #36FEB3 100%)",
        // 'linear-gradient(to right, #FFD80D 0%,#FF720D 10%, #E44270  40%, #CB14CE  60%, #5E23DA  100%)',
        // backgroundImage: 'linear-gradient(to right, #fc00ff 0%, #00dbde  51%, #fc00ff  100%)',
        color: "white",
        // boxShadow: theme.customShadows.z8,
        transition: "0.5s",
        backgroundSize: "200% auto",
        "&:hover": {
          // boxShadow: theme.customShadows.z20,
          backgroundPosition:
            "right center" /* change the direction of the change here */,
        },
      },
      containedPrimary: {
        backgroundColor: "rgba(255, 255, 255, .40)",
        color: "white",
        border: `1px solid white`,
        // boxShadow: theme.customShadows.z8,
        "&:hover": {
          backgroundSize: "200% auto",
          // backgroundColor: theme.palette.grey[900],
          backgroundImage:
            "linear-gradient(to right, #36FEB3 0%,#5E23DA 51%, #36FEB3 100%)",
          // boxShadow: theme.customShadows.z20,
          backgroundPosition:
            "right center" /* change the direction of the change here */,
          // transform: 'translateY(-2px)'
          transition: "0.5s",
        },
      },
      containedSecondary: {
        // boxShadow: theme.customShadows.secondary,
        backgroundColor: "#DFE3E8",
        color: "black",
        "&:hover": {
          backgroundColor: "white",
        },
      },
      outlinedInherit: {
        border: `1px solid grey`,
        "&:hover": {
          // backgroundColor: theme.palette.action.hover,
        },
      },
      textInherit: {
        "&:hover": {
          // backgroundColor: theme.palette.action.hover,
        },
      },
    },
  };
}
// <stop offset="0.0104167" stopColor="#36FEB3" />
//             <stop offset="0.447917" stopColor="#145ECE" />
//             <stop offset="0.760417" stopColor="#5E23DA" />
