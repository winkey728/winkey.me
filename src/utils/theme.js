import purple from "material-ui/colors/purple";
import cyan from "material-ui/colors/cyan";
import { fontFamily } from "./typography";

const theme = {
  palette: {
    type: "dark",
    primary: { main: purple[500] },
    secondary: { main: cyan[500] },
    background: {
      accent: "#eee8d5",
      paper: "#073642",
      default: "#002b36"
    },
    text: {
      primary: "#839496",
      secondary: "#586e75",
      disabled: "#415257",
      accent: "#657b83",
      hint: "rgba(255, 255, 255, 0.5)",
      icon: "rgba(255, 255, 255, 0.5)"
    }
  },
  typography: {
    fontFamily: fontFamily.reduce((item, acc) => item + "," + acc)
  },
  spacing: {
    unit: 8
  }
};

export default theme;
