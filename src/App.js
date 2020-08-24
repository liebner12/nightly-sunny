import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Weather from "./components/Weather";
import "fontsource-oswald/500.css";
import yellow from "@material-ui/core/colors/yellow";
import blue from "@material-ui/core/colors/blue";
import indigo from "@material-ui/core/colors/indigo";
import "./App.css";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          primary: {
            main: prefersDarkMode ? yellow[600] : yellow[600],
          },
          background: {
            default: prefersDarkMode ? "#303030" : blue[500],
            paper: prefersDarkMode ? indigo[500] : yellow[300],
          },
          navbar: {
            background: prefersDarkMode ? "rgb(35,35,35)" : blue[400],
          },
          hr: {
            background: prefersDarkMode ? yellow[600] : blue[500],
          },
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Weather />
    </ThemeProvider>
  );
}

export default App;
