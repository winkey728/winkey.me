import React, { Component } from "react";
import styled from "styled-components";
import md5 from "md5";
import { withSiteConfig } from "../SiteConfig";

import "gitalk/dist/gitalk.css";

const Wrapper = styled.div.attrs({
  id: "gitalk-container"
})`
  margin: 40px 0 10px 0;
`;

class Comment extends Component {
  componentDidMount() {
    const { title, siteConfig } = this.props;
    const { clientID, clientSecret, repo, owner, admin } = siteConfig.gitalk;
    const p = window.location.pathname;
    const id = md5(p.endsWith("/") ? p.slice(0, -1) : p);

    // Because Gitalk reference window out of componentDidMount,
    // global import will cause error: window is not defined.
    const Gitalk = require("gitalk");
    const gitalk = new Gitalk({
      clientID,
      clientSecret,
      repo,
      owner,
      admin,
      distractionFreeMode: true,
      id,
      title
    });

    gitalk.render("gitalk-container");
  }

  render() {
    return <Wrapper />;
  }
}

export default withSiteConfig(Comment);
