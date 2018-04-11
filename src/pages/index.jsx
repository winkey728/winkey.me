import React, { Component } from "react";
import styled from "styled-components";
import Img from "gatsby-image";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import List from "material-ui-icons/List";
import Logo from "../components/Logo";
import Menu from "material-ui-icons/Menu";
import Close from "material-ui-icons/Close";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import Helmet from "react-helmet";
import R from "ramda";
import Link from "../components/MyLink";
import Icon from "../components/other/Icon";
import SEO from "../components/SEO";
import { withSiteConfig } from "../components/SiteConfig";
import { LOGOS } from "../utils/constants";
import muiIcons from "../utils/icons";

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
`;

const Wrapper = ({ image, children }) => (
  <div>
    <Img
      style={{
        top: 0,
        left: 0,
        right: 0,
        zIndex: 0,
        position: `absolute`,
        height: `100%`
      }}
      sizes={image}
    />
    <Overlay />
    {children}
  </div>
);

// Setting spacing to 0 is a workround of horizontal scrollbar issue
// Refer: https://github.com/mui-org/material-ui/issues/7466
const Content = styled(Grid).attrs({
  container: true,
  alignItems: "center",
  justify: "center",
  spacing: 0
})`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const Item = styled(Grid).attrs({
  item: true,
  xs: 12,
  md: 9,
  lg: 6
})`
  text-align: center;
`;

const Label = styled(Img)`
  width: 303px;
  margin: 96px auto 16px;
`;

const RightIcon = styled(List)`
  margin-left: ${props => props.theme.spacing.unit}px;
`;

const SpeedDialContainer = styled.div`
  position: absolute;
  bottom: ${props => props.theme.spacing.unit * 2}px;
  right: ${props => props.theme.spacing.unit * 2}px;
  z-index: 999;
`;

class Index extends Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { data, siteConfig } = this.props;
    const { open } = this.state;
    const { siteMetas, routes, navigationLinks } = siteConfig;

    return (
      <Wrapper image={data.backgroundImage.sizes}>
        {/* SEO */}
        <Helmet>
          <title>{siteMetas.title}</title>
          <meta name="keywords" content={R.join(", ")(siteMetas.keywords)} />
          <link rel="canonical" href={routes.home.absoluteUrl} />
        </Helmet>
        <SEO />

        <Content>
          <Item>
            <Logo svg={LOGOS.MAIN} />
            <Label sizes={data.label.sizes} />
            <Link to="/blog">
              <Button color="primary" variant="raised">
                进入博客
                <RightIcon />
              </Button>
            </Link>
          </Item>
        </Content>
        <SpeedDialContainer>
          <SpeedDial
            ariaLabel="Menu Links"
            icon={<SpeedDialIcon icon={<Menu />} openIcon={<Close />} />}
            onBlur={this.handleClose}
            onClick={this.handleClick}
            onClose={this.handleClose}
            onFocus={this.handleOpen}
            onMouseEnter={this.handleOpen}
            onMouseLeave={this.handleClose}
            open={open}
            ButtonProps={{ color: "secondary" }}
          >
            {R.pipe(
              R.filter(({ display, speedDial }) => display && speedDial),
              R.map(({ label, url, icon }) => (
                <Link key={url} to={url}>
                  <SpeedDialAction icon={muiIcons(icon)} tooltipTitle={label} />
                </Link>
              ))
            )(navigationLinks)}
          </SpeedDial>
        </SpeedDialContainer>
      </Wrapper>
    );
  }
}

export default withSiteConfig(Index);

export const pageQuery = graphql`
  query IndexQuery {
    backgroundImage: imageSharp(id: { regex: "/Anime-index/" }) {
      sizes(maxWidth: 1500) {
        ...GatsbyImageSharpSizes
      }
    }
    label: imageSharp(id: { regex: "/index-label/" }) {
      sizes(maxWidth: 303) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
