import React from "react";
import styled, { withTheme } from "styled-components";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import { TagCloud } from "react-tagcloud";
import Helmet from "react-helmet";
import R from "ramda";
import kebabCase from "lodash.kebabcase";
import Entry, { EntryContent } from "../components/Entry";
import Link from "../components/MyLink";
import SEO from "../components/SEO";
import { withSiteConfig } from "../components/SiteConfig";

const MIN_SIZE = 1;
const MAX_SIZE = 10;
const PORTION = 3;

function inRange(value, min = MIN_SIZE, max = MAX_SIZE, portion = PORTION) {
  return Math.ceil(value / ((max - min) / portion));
}

const TagCloudWrapper = styled.div`
  margin: 60px ${props => props.theme.spacing.unit * 3}px;
`;

const Tag = styled.span`
  && {
    font-size: ${props =>
      (props.weight - MIN_SIZE) / (MAX_SIZE - MIN_SIZE) + 1}rem;
    line-height: 1;
    color: ${props => {
      return R.pipe(
        R.pick(["disabled", "secondary", "primary"]),
        R.values,
        R.nth(inRange(props.weight) - 1)
      )(props.theme.palette.text);
    }};
    text-transform: none;
  }
`;

const Tags = ({
  data: { allMarkdownRemark: { group } },
  theme,
  siteConfig: { siteMetas, routes }
}) => {
  const data = R.map(tag => ({
    value: tag.fieldValue,
    count: tag.totalCount
  }))(group);

  const tagcloudRenderer = (tag, size, color) => {
    const weight = isNaN(size) || size < 0 ? MIN_SIZE : size;
    const { value } = tag;

    return (
      <Link key={value} to={`${routes.tag.path}/${kebabCase(value)}`}>
        <Button>
          <Tag weight={weight}>{value}</Tag>
        </Button>
      </Link>
    );
  };

  return (
    <Entry>
      {/* SEO */}
      <Helmet>
        <title>{`标签 | ${siteMetas.title}`}</title>
        <meta
          name="keywords"
          content={R.pipe(R.join(", "), R.append("标签"))(siteMetas.keywords)}
        />
        <link rel="canonical" href={routes.tag.absoluteUrl} />
      </Helmet>
      <SEO />

      <EntryContent>
        <Typography variant="title" align="center" gutterBottom>
          目前共计{group.length}个标签
        </Typography>
        <TagCloudWrapper>
          <TagCloud
            disableRandomColor
            shuffle
            tags={data}
            minSize={MIN_SIZE}
            maxSize={MAX_SIZE}
            renderer={tagcloudRenderer}
          />
        </TagCloudWrapper>
      </EntryContent>
    </Entry>
  );
};

export default R.pipe(withSiteConfig, withTheme)(Tags);

export const pageQuery = graphql`
  query TagsQuery {
    allMarkdownRemark(filter: { frontmatter: { publish: { ne: false } } }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
