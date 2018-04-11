import React from "react";
import styled from "styled-components";

import Root from "../components/Root";
import Drawer from "../components/Drawer";
import Footer from "../components/Footer";

const Content = styled.main`
  flex: 1;
  margin-top: 64px;
  display: flex;
  flex-direction: column;

  ${props => props.theme.breakpoints.up("lg")} {
    margin-left: 240px;
    margin-top: 0;
  }
`;

const ContentMain = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.unit * 2}px;

  ${props => props.theme.breakpoints.up("lg")} {
    padding: ${props => props.theme.spacing.unit * 3}px;
  }
`;

export default ({ children }) => (
  <Root>
    <Drawer />

    <Content>
      <ContentMain>{children()}</ContentMain>
      <Footer />
    </Content>
  </Root>
);
