import React, { Component } from "react";
import styled from "styled-components";
import Drawer from "material-ui/Drawer";
import List from "material-ui/List";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Hidden from "material-ui/Hidden";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import MenuIcon from "material-ui-icons/Menu";
import Navigation from "../Navigation";
import { withSiteConfig } from "../SiteConfig";

const drawerWidth = 240;

const StyledDrawer = withStyles(
  theme => ({
    paper: {
      width: drawerWidth
    }
  }),
  { withTheme: true }
)(Drawer);

const MenuButton = styled(IconButton)`
  && {
    margin-left: ${props => props.theme.spacing.unit * -1.5}px;
  }
`;

const Title = styled(Typography)`
  && {
    margin-left: ${props => props.theme.spacing.unit * 3}px;
  }
`;

class MyDrawer extends Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleClose = () => {
    this.setState({ mobileOpen: false });
  };

  render() {
    const { siteConfig } = this.props;
    const { mobileOpen } = this.state;

    const drawer = (
      <Navigation
        list={siteConfig.navigationLinks}
        onItemClick={this.handleClose}
      />
    );

    return (
      <div>
        <Hidden lgUp implementation="css">
          <AppBar>
            <Toolbar>
              <MenuButton
                color="inherit"
                aria-label="Menu"
                onClick={this.handleDrawerToggle}
              >
                <MenuIcon />
              </MenuButton>
              <Title variant="title" color="inherit" noWrap>
                Winkey
              </Title>
            </Toolbar>
          </AppBar>
          <StyledDrawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={this.handleClose}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </StyledDrawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <StyledDrawer variant="permanent" open>
            {drawer}
          </StyledDrawer>
        </Hidden>
      </div>
    );
  }
}

export default withSiteConfig(MyDrawer);
