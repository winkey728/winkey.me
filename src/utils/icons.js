import React from "react";
import * as MuiIcons from "material-ui-icons";

export default name => {
  const Icon = MuiIcons[name];
  return <Icon />;
};
