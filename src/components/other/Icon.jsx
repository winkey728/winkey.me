import React from "react";
import PropTypes from "prop-types";
import SvgIcon from "material-ui/SvgIcon";

const Icon = ({ icon, color }) => {
  return (
    <SvgIcon viewBox={icon.viewBox} nativeColor={color}>
      {icon.path}
    </SvgIcon>
  );
};

Icon.propTypes = {
  icon: PropTypes.shape({
    viewBox: PropTypes.string.isRequired,
    path: PropTypes.element.isRequired
  }).isRequired,
  color: PropTypes.string
};

export default Icon;
