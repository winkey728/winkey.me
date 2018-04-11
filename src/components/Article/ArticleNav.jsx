import React from "react";
import styled from "styled-components";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import NavigateBefore from "material-ui-icons/NavigateBefore";
import NavigateNext from "material-ui-icons/NavigateNext";
import Link from "../MyLink";
import { withSiteConfig } from "../SiteConfig";

const Wrapper = styled.div`
  margin: 40px 0 10px 0;
  padding-top: 10px;
  border-top: 1px solid #666666;
`;

const BaseLink = styled(Link)`
  && {
    display: flex;
    flex-direction: row;
    color: ${props => props.theme.palette.text.primary};
  }

  &&:hover {
    color: ${props => props.theme.palette.text.secondary};
  }

  & > h6 {
    line-height: 24px;
  }

  & > h6:hover {
    color: ${props => props.theme.palette.text.secondary};
  }
`;

const LeftLink = BaseLink.extend`
  && {
    justify-content: flex-start;
  }
`;

const RightLink = BaseLink.extend`
  && {
    justify-content: flex-end;
  }
`;

const ArticleNav = ({ prev, next, siteConfig: { routes } }) => (
  <Wrapper>
    <Grid container spacing={40}>
      <Grid item xs={6}>
        {prev &&
          prev.title && (
            <LeftLink to={`${routes.blog.path}${prev.slug}`}>
              <NavigateBefore />
              <Typography variant="body1" component="h6">
                {prev.title}
              </Typography>
            </LeftLink>
          )}
      </Grid>
      <Grid item xs={6}>
        {next &&
          next.title && (
            <RightLink to={`${routes.blog.path}${next.slug}`}>
              <Typography variant="body1" component="h6">
                {next.title}
              </Typography>
              <NavigateNext />
            </RightLink>
          )}
      </Grid>
    </Grid>
  </Wrapper>
);

export default withSiteConfig(ArticleNav);
