import React from "react";
import styled from "styled-components";
import List, { ListItem, ListItemText } from "material-ui/List";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Helmet from "react-helmet";
import R from "ramda";
import kebabCase from "lodash.kebabcase";
import Link from "../components/MyLink";
import Entry, { EntryContent } from "../components/Entry";
import SEO from "../components/SEO";
import { withSiteConfig } from "../components/SiteConfig";

const CategoryList = styled(List)`
  display: inline-block;
`;

const CategoryCount = styled.span`
  font-size: ${props => props.theme.typography.caption.fontSize};
  font-weight: ${props => props.theme.typography.caption.fontWeight};
  font-family: ${props => props.theme.typography.caption.fontFamily};
  line-height: ${props => props.theme.typography.caption.lineHeight};
  color: ${props => props.theme.palette.text.secondary};

  &:before {
    content: "\00a0(";
    display: inline;
  }

  &:after {
    content: ")\00a0";
    display: inline;
  }
`;

const Categories = ({
  data: { allMarkdownRemark: { group } },
  siteConfig: { siteMetas, routes }
}) => (
  <Entry>
    {/* SEO */}
    <Helmet>
      <title>{`分类 | ${siteMetas.title}`}</title>
      <meta
        name="keywords"
        content={R.pipe(R.join(", "), R.append("分类"))(siteMetas.keywords)}
      />
      <link rel="canonical" href={routes.category.absoluteUrl} />
    </Helmet>
    <SEO />

    <EntryContent>
      <Typography variant="title" align="center" gutterBottom>
        目前共计{group.length}个分类
      </Typography>
      <CategoryList>
        {R.map((category, index) => (
          <Link
            key={category.fieldValue}
            to={`${routes.category.path}/${kebabCase(
              category.fieldValue
            )}`}
          >
            <ListItem button>
              <Typography variant="subheading" paragraph={false}>
                {category.fieldValue}
                <CategoryCount>{category.totalCount}</CategoryCount>
              </Typography>
            </ListItem>
          </Link>
        ))(group)}
      </CategoryList>
    </EntryContent>
  </Entry>
);

export default withSiteConfig(Categories);

export const pageQuery = graphql`
  query CategoriesQuery {
    allMarkdownRemark(filter: { frontmatter: { publish: { ne: false } } }) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`;
