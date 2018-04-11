import React, { Component } from "react";
import styled from "styled-components";
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions
} from "material-ui/Card";
import Button from "material-ui/Button";
import Avatar from "material-ui/Avatar";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import Apps from "material-ui-icons/Apps";
import LocalOffer from "material-ui-icons/LocalOffer";
import Link from "../MyLink";
import PostMetas from "../PostMetas";
import Datetime from "../Datetime";
import { EntryThumbnail } from "../Entry";
import { withSiteConfig } from "../SiteConfig";

const defaultShadow = 4;

const hoverShadow = 12;

const StyledCard = EntryThumbnail.withComponent(
  class C extends Component {
    state = {
      shadow: hoverShadow
    };

    onMouseOver = () => this.setState({ shadow: hoverShadow });

    onMouseOut = () => this.setState({ shadow: defaultShadow });

    render() {
      const { className } = this.props;

      return (
        <Card
          className={className}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          elevation={this.state.shadow}
        >
          {this.props.children}
        </Card>
      );
    }
  }
);

const StyledAvatar = styled(Avatar)`
  && {
    color: #fff;
    background-color: ${props => props.theme.palette.primary.main};
  }
`;

const VerticalSpacing = styled.div`
  height: 8px;
`;

const StyledLink = styled(Link)`
  &:hover {
    color: inherit;
  }
`;

const PostLink = ({
  post: { title, date, path, cover, category, tags, excerpt },
  siteConfig: { routes }
}) => (
  <StyledCard>
    <CardHeader
      avatar={<StyledAvatar aria-label="Recipe">R</StyledAvatar>}
      title={
        <StyledLink to={`${routes.blog.path}${path}`}>
          {title}
        </StyledLink>
      }
      subheader={<Datetime datetime={date} format="MMMM DD, YYYY" />}
    />
    <CardMedia style={{ height: 200 }} image={cover} />
    <CardContent>
      <Typography paragraph>{excerpt}</Typography>
      <PostMetas
        path={routes.category.path}
        icon={<Apps />}
        metas={category}
      />
      <VerticalSpacing />
      <PostMetas
        path={routes.tag.path}
        icon={<LocalOffer />}
        metas={tags}
      />
    </CardContent>
    <CardActions>
      <Link to={`${routes.blog.path}${path}`}>
        <Button size="small">阅读原文</Button>
      </Link>
    </CardActions>
  </StyledCard>
);

export default withSiteConfig(PostLink);
