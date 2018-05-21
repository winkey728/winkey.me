import Typography from "typography";
import CodePlugin from "typography-plugin-code";
import bootstrapTheme from "typography-theme-bootstrap";

export const fontFamily = [
  "Roboto",
  "-apple-system",
  "SF UI Text",
  "PingFang SC",
  "Hiragino Sans GB",
  "Microsoft YaHei",
  "WebQuanYi Micro Hei",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Helvetica",
  "Arial",
  "sans-serif"
];

bootstrapTheme.headerFontFamily = fontFamily;
bootstrapTheme.bodyFontFamily = fontFamily;
bootstrapTheme.overrideThemeStyles = ({ rhythm }, options) => ({
  html: {
    overflowY: "inherit"
  },
  a: {
    color: "#839496"
  },
  "a:hover": {
    color: "#586e75"
  },
  "::-webkit-scrollbar": {
    width: "8px"
  },
  "::-webkit-scrollbar-thumb": {
    background: "#666",
    borderRadius: "16px"
  },
  "::-webkit-scrollbar-track": {
    background: "#ddd",
    borderRadius: "16px"
  }
});
bootstrapTheme.plugins = [new CodePlugin()];

const typography = new Typography(bootstrapTheme);

export default typography;
