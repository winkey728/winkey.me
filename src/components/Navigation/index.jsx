import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Divider from "material-ui/Divider";
import { withStyles } from "material-ui/styles";
import R from "ramda";
import Link from "../MyLink";
import Logo from "../Logo";
import { withSiteConfig } from "../SiteConfig";
import { LOGOS } from "../../utils/constants";
import muiIcons from "../../utils/icons";

const InnerWrapper = styled.div`
  width: 98%;
  margin: 40px auto 0;
  padding-top: 10px;
  text-align: center;
  overflow: auto;
`;

const Name = styled.h2`
  color: #fff;
  margin: 0.67em 0;
`;

const Maxim = styled.p`
  font-size: 14px;
  color: ${props => props.theme.palette.text.primary};
  text-overflow: ellipsis;
`;

const NavItem = withStyles({
  primary: {
    color: "#fff"
  }
})(({ classes, onClick, label, url, icon }) => (
  <Link to={url} onClick={onClick}>
    <ListItem button>
      <ListItemIcon>{muiIcons(icon)}</ListItemIcon>
      <ListItemText classes={{ primary: classes.primary }} primary={label} />
    </ListItem>
  </Link>
));

const Navigation = ({ list, onItemClick, siteConfig: { author } }) => (
  <InnerWrapper>
    <Logo svg={LOGOS.MAIN} width={128} marginBottom={5} />
    <Name>{author.name}</Name>
    <Maxim>{author.maxim}</Maxim>
    <Divider />
    <List>
      {R.pipe(
        R.filter(({ display }) => display),
        R.map(item => (
          <NavItem
            key={item.url}
            onClick={onItemClick && (() => onItemClick(item))}
            {...item}
          />
        ))
      )(list)}
    </List>
  </InnerWrapper>
);

Navigation.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      display: PropTypes.bool.isRequired
    })
  ).isRequired,
  onItemClick: PropTypes.func
};

export default withSiteConfig(Navigation);
