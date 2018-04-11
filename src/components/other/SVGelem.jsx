import React from "react";
import PropTypes from "prop-types";

const SVGelem = ({ svg }) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      preserveAspectRatio="xMidYMid meet"
      viewBox={svg.viewBox}
      width="100%"
      height="100%"
    >
      {svg.path}
    </svg>
  );
};

SVGelem.propTypes = {
  svg: PropTypes.shape({
    viewBox: PropTypes.string.isRequired,
    path: PropTypes.element.isRequired
  }).isRequired
};

export default SVGelem;
