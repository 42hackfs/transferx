import React, { useMemo, ReactNode } from "react";
// material
import { CssBaseline } from "@material-ui/core";
import {
  ThemeProvider,
  ThemeOptions,
  createTheme,
} from "@material-ui/core/styles";
// import StyledEngineProvider from "@material-ui/core/StyledEngineProvider";
//
// import shape from "./shape";
// import palette from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";
import GlobalStyles from "./globalStyles";
// import componentsOverride from './overrides';
import shadows, { customShadows } from "./shadows";

// ----------------------------------------------------------------------

type ThemeConfigProps = {
  children: ReactNode;
};

export default function ThemeConfig({ children }: ThemeConfigProps) {
  const isLight = true;

  const themeOptions: ThemeOptions = {
    typography,
    breakpoints,
    shadows: isLight ? shadows.light : shadows.dark,
    customShadows: isLight ? customShadows.light : customShadows.dark,
  };

  const theme = createTheme(themeOptions);
  // theme.components = componentsOverride(theme);

  return (
    // <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </ThemeProvider>
    // {/* </StyledEngineProvider> */}
  );
}
