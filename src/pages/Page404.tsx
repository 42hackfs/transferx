import React from "react";
// import { motion } from "framer-motion";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Link as RouterLink } from "react-router-dom";
// material
// import { styled } from "@material-ui/core/styles";
import { Box, Button, Typography, Container } from "@material-ui/core";
// components
// import { MotionContainer, varBounceIn } from "../components/animate";
// import Page from "../components/Page";
import { PageNotFoundIllustration } from "../assets";

// ----------------------------------------------------------------------

// const RootStyle = styled(Page)(({ theme }) => ({
//   display: "flex",
//   minHeight: "100%",
//   alignItems: "center",
//   paddingTop: theme.spacing(15),
//   paddingBottom: theme.spacing(10),
// }));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    // <RootStyle title="404 Page Not Found | Minimal-UI">
    <Container>
      <div>
        <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
          <div>
            <Typography variant="h3" paragraph>
              Sorry, page not found!
            </Typography>
          </div>
          <Typography color="textSecondary">
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? Be sure to check your spelling.
          </Typography>

          <div>
            <PageNotFoundIllustration
              sx={{ height: 260, my: { xs: 5, sm: 10 } }}
            />
          </div>

          <Button
            to="/"
            size="large"
            variant="contained"
            component={RouterLink}
          >
            Go to Home
          </Button>
        </Box>
      </div>
    </Container>
  );
}
