import React from "react";
import styled, { ThemeProvider, injectGlobal } from "styled-components";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import CssBaseLine from "material-ui/CssBaseline";
import Helmet from "react-helmet";
import { SiteConfigProvider } from "../SiteConfig";
import theme from "../../utils/theme";
import siteConfig from "../../utils/siteConfig";

const Main = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.palette.background.default};
  color: ${props => props.theme.palette.text.primary};
  z-index: -1000;
`;

const muiTheme = createMuiTheme(theme);

export default ({ children }) => (
  <MuiThemeProvider theme={muiTheme}>
    <ThemeProvider theme={muiTheme}>
      <SiteConfigProvider siteConfig={siteConfig}>
        <Main>
          <Helmet>
            <html lang="zh-CN" />
          </Helmet>
          <CssBaseLine />
          {children}
        </Main>
      </SiteConfigProvider>
    </ThemeProvider>
  </MuiThemeProvider>
);
