import { Theme } from "@material-ui/core/styles";

// ----------------------------------------------------------------------

export default function Card() {
  return {
    MuiCard: {
      root: {
        // boxShadow: theme.customShadows.z16,
        // borderRadius: theme.shape.borderRadiusMd,
        position: "relative",
        backgroundColor: "rgba(255, 255, 255, .10)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        color: "white",
        border: "1px solid white",
        zIndex: 0, // Fix Safari overflow: hidden with border radius
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 20,
        padding: 20,
      },
    },
  };
}
