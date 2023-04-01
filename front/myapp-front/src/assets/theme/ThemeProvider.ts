import { ThemeProvider, createTheme } from "@mui/material/styles";

// Add the new font theme to all elements
const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
  },
});

export { theme, ThemeProvider };
