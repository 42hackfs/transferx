// routes
import Router from "./routes";
// theme
import ThemeConfig from "./theme";
// hooks
// import useAuth from './hooks/useAuth';
// // components
// import RtlLayout from './components/RtlLayout';
// import ScrollToTop from './components/ScrollToTop';
// import LoadingScreen from './components/LoadingScreen';
// import GoogleAnalytics from './components/GoogleAnalytics';
import NotistackProvider from "./components/NotistackProvider";

// ----------------------------------------------------------------------
import React from "react";

export default function App(): React.ReactElement {
  // const { isInitialized } = useAuth();

  return (
    <ThemeConfig>
      <NotistackProvider>
        <Router />
      </NotistackProvider>
    </ThemeConfig>
  );
}
