import React from "react";
import styled, { withTheme } from "styled-components";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import Favorite from "material-ui-icons/Favorite";
import R from "ramda";
import Link from "../MyLink";
import { withSiteConfig } from "../SiteConfig";
import Icon from "../other/Icon";
import { entry, entryDetail } from "../../utils/styles";
import { ICONS } from "../../utils/constants";

const Wrapper = styled.footer`
  flex-shrink: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  min-height: 50px;
  margin-top: 80px;
  padding: 10px 0;
  background: ${props => props.theme.palette.background.paper};
  color: ${props => props.theme.palette.text.secondary};
`;

const Inner = styled.div`
  ${entry};

  ${entryDetail};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Love = styled(Favorite)`
  && {
    width: 12px;
    height: 12px;
    margin: 0 4px;
  }
`;

const Copyright = styled(Typography).attrs({
  align: "left",
  component: "div"
})`
  && {
    line-height: 28px;
  }
`;

const Footer = ({ theme, siteConfig: { author: { socialLinks } } }) => (
  <Wrapper>
    <Inner>
      <div>
        <Copyright>
          © 2018 <Love /> Winkey
        </Copyright>
        <Copyright>
          Powered by&nbsp;
          <Link to="https://www.gatsbyjs.org/" external>
            Gatsby
          </Link>
        </Copyright>
      </div>
      <div>
        {R.map(link => (
          <Link key={link.url} to={link.url} external>
            <IconButton aria-label={link.label}>
              <Icon
                icon={ICONS[link.iconName.toUpperCase()]}
                color={theme.palette.text.primary}
              />
            </IconButton>
          </Link>
        ))(socialLinks)}
      </div>
    </Inner>
  </Wrapper>
);

export default R.pipe(withSiteConfig, withTheme)(Footer);
