import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Global CSS
import { Provider } from "react-redux";
import store from "./redux/store";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

// MUI Theme for Consistency
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff9800",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures consistent MUI styling */}
      <App />
    </ThemeProvider>
  </Provider>
);
