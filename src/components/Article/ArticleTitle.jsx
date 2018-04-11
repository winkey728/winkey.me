import React from "react";
import styled from "styled-components";
import Typography from "material-ui/Typography";

const WithBackgroundImage = styled.header`
  position: relative;
  display: flex;
  padding: 1rem 1.2rem;
  align-items: flex-end;
  height: 240px;
  color: #fff;
  z-index: 1;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    z-index: -1;
    background: url(${props => props.backgroundImage}) no-repeat center center;
    background-size: cover;
  }
`;

const ArticleTitle = ({ title, backgroundImage }) => (
  <WithBackgroundImage backgroundImage={backgroundImage}>
    <Typography variant="title" color="inherit">
      {title}
    </Typography>
  </WithBackgroundImage>
);

export default ArticleTitle;
