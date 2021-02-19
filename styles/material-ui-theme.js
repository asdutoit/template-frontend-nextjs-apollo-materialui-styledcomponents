import { createMuiTheme } from "@material-ui/core/styles";

const materialTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "rgba(246, 62, 94, 1.00)",
    },
    background: {
      default: "#fff",
    },
  },
});

export { materialTheme };