import React, { Component } from "react";
import PropTypes from "prop-types";

const withSiteConfig = ComponentToWrap => {
  class WithSiteConfig extends Component {
    static contextTypes = {
      siteConfig: PropTypes.object.isRequired
    };

    render() {
      const props = {
        siteConfig: this.context.siteConfig,
        ...this.props
      };
      return <ComponentToWrap {...props} />;
    }
  }

  return WithSiteConfig;
};

export default withSiteConfig;
