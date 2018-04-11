import React from "react";
import Link from "../MyLink";
import styled from "styled-components";
import Chip from "material-ui/Chip";
import R from "ramda";
import kebabCase from "lodash.kebabcase";
import { withSiteConfig } from "../SiteConfig";

const Wrapper = styled.div`
  margin-top: 40px;

  & > a:not(:last-child) {
    margin-right: 10px;
  }
`;

const ArticleTags = ({ tags, siteConfig: { routes } }) => (
  <Wrapper>
    {tags &&
      R.map(tag => (
        <Link key={tag} to={`${routes.tag.path}/${kebabCase(tag)}`}>
          <Chip label={`# ${tag}`} onClick={() => {}} />
        </Link>
      ))(tags)}
  </Wrapper>
);

export default withSiteConfig(ArticleTags);
