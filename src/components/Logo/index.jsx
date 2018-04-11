import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SVGelem from "../other/SVGelem";

const Wrapper = styled.span`
  display: block;
  width: ${props => props.width}px;
  margin-left: auto;
  margin-right: auto;
`;

const Logo = ({ svg, width = 480 }) => (
  <Wrapper width={width}>
    <SVGelem svg={svg} />
  </Wrapper>
);

Logo.propTypes = {
  svg: PropTypes.shape({
    viewBox: PropTypes.string.isRequired,
    path: PropTypes.element.isRequired
  }).isRequired,
  width: PropTypes.number
};

export default Logo;
