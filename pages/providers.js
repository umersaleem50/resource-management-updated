import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { CookiesProvider } from "react-cookie";
import { SnackbarProvider } from "notistack";

const Providers = (props) => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Poppins", "san-serif"].join(","),
      fontSize: 18,
    },
  });

  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={5}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={4000}
        >
          {props.children}
        </SnackbarProvider>
      </ThemeProvider>
    </CookiesProvider>
  );
};

export default Providers;
