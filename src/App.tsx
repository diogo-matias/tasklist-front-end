import { Box } from "@mui/system";
import React from "react";
import "./App.css";
import Router from "./app/router";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Messages from "./app/shared/components/Messages";
import {
  createTheme,
  ThemeProvider,
  Typography,
  CssBaseline,
} from "@mui/material";
import "./fonts/GothamBold.ttf";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["gotham"].join(","),
    },
    palette: {
      mode: "dark",
      primary: {
        main: "#7e4ee9",
      },
      secondary: {
        main: "#0dbacb",
      },
      info: {
        main: "#e2a10f",
      },

      background: {
        paper: "#3a3d75",
        default: "#21264b",
      },
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Messages />
        <Router />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
