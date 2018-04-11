import React from "react";
import styled from "styled-components";
import Typography from "material-ui/Typography";
import R from "ramda";
import Link from "../MyLink";
import Datetime from "../Datetime";
import { withSiteConfig } from "../SiteConfig";

const Wrapper = styled.section`
  position: relative;
  margin: 0;
  z-index: 100;

  &:after {
    content: " ";
    position: absolute;
    top: 16px;
    left: 0;
    margin-left: -2px;
    width: 4px;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Title = styled.div`
  position: relative;
  margin: 60px 0;

  &:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 50%;
    margin-left: -4px;
    margin-top: -4px;
    width: 8px;
    height: 8px;
    background: ${props => props.theme.palette.text.secondary};
    border-radius: 50%;
    z-index: 10;
  }
`;

const TitleHeading = styled(Typography).attrs({
  variant: "headline",
  component: "h2"
})`
  && {
    font-weight: 500;
    margin-left: 20px;
  }
`;

const TitleType = styled(Typography).attrs({
  variant: "headline",
  component: "span"
})`
  && {
    display: inline;
    font-size: 0.8em;
    font-weight: 500;
    margin-left: ${props => props.theme.spacing.unit}px;
    opacity: 0.5;
  }
`;

const Article = styled.article`
  margin: 30px 0;
`;

const ArticleHeader = styled.header`
  position: relative;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.3);

  &:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 50%;
    width: 6px;
    height: 6px;
    margin-top: -3px;
    margin-left: -3px;
    background: ${props => props.theme.palette.text.secondary};
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const ArticleTitle = styled(Typography).attrs({
  variant: "title",
  component: "h1"
})`
  && {
    padding: ${props => props.theme.spacing.unit * 2}px 0
      ${props => props.theme.spacing.unit * 2}px 96px;
  }
`;

const ArticleMeta = styled(Typography).attrs({
  component: "div"
})`
  && {
    position: absolute;
    left: ${props => props.theme.spacing.unit * 2}px;
    top: 50%;
    margin-top: -10px;
  }
`;

const PostCollapse = ({
  title,
  type,
  count,
  posts,
  siteConfig: { routes }
}) => (
  <Wrapper>
    <Title>
      <TitleHeading>
        {title}
        <TitleType>{type == "category" ? "分类" : "标签"}</TitleType>
      </TitleHeading>
    </Title>
    {R.map(post => (
      <Article key={post.title}>
        <ArticleHeader>
          <ArticleTitle>
            <Link to={`${routes.blog.path}${post.path}`}>
              {post.title}
            </Link>
          </ArticleTitle>
          <ArticleMeta>
            <Datetime datetime={post.date} format="YYYY-MM-DD" />
          </ArticleMeta>
        </ArticleHeader>
      </Article>
    ))(posts)}
  </Wrapper>
);

export default withSiteConfig(PostCollapse);
