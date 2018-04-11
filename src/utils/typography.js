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
  }
});
bootstrapTheme.plugins = [new CodePlugin()];

const typography = new Typography(bootstrapTheme);

export default typography;
