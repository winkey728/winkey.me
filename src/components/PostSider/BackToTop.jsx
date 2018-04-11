import React from "react";
import Button from "material-ui/Button";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";
import UP from "material-ui-icons/KeyboardArrowUp";
import ScrollToTop from "../ScrollToTop";

const BackToTop = () => (
  <ScrollToTop showUnder={400}>
    <Tooltip id="back-to-top" title="回到顶部" placement="left">
      <Button variant="fab" mini color="secondary">
        <UP />
      </Button>
    </Tooltip>
  </ScrollToTop>
);

export default BackToTop;
