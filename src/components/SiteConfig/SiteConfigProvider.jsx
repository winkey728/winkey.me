import React, { Component, Children } from "react";
import PropTypes from "prop-types";

class SiteConfigProvider extends Component {
  static propTypes = {
    siteConfig: PropTypes.object.isRequired
  };

  static childContextTypes = {
    siteConfig: PropTypes.object.isRequired
  };

  getChildContext() {
    const { siteConfig } = this.props;
    return { siteConfig };
  }

  render() {
    return Children.only(this.props.children);
  }
}

export default SiteConfigProvider;
