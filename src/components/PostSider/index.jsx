import React from "react";
import styled from "styled-components";
import Tooltip from "material-ui/Tooltip";
import BackToTop from "./BackToTop";

const Wrapper = styled.aside`
  position: fixed;
  display: flex;
  flex-direction: column-reverse;
  right: ${props => props.theme.spacing.unit * 3}px;
  bottom: 52px;

  & > * {
    margin: ${props => props.theme.spacing.unit / 2}px 0;
  }
`;

const PostSider = () => (
  <Wrapper>
    <BackToTop />
  </Wrapper>
);

export default PostSider;
