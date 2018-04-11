import React from "react";
import Helmet from "react-helmet";
import R from "ramda";
import kebabCase from "lodash.kebabcase";
import Entry, { EntryContent } from "../components/Entry";
import Collapse from "../components/PostCollapse";
import SEO from "../components/SEO";
import { withSiteConfig } from "../components/SiteConfig";

const Category = ({ pathContext, data, siteConfig }) => {
  const { category } = pathContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const posts = R.map(edge => ({
    title: edge.node.frontmatter.title,
    date: edge.node.frontmatter.date,
    path: edge.node.fields.slug
  }))(edges);
  const { siteMetas, routes } = siteConfig;

  return (
    <Entry>
      {/* SEO */}
      <Helmet>
        <title>{`文章分类: ${category} | ${siteMetas.title}`}</title>
        <meta
          name="keywords"
          content={R.pipe(R.join(", "), R.append(category))(siteMetas.keywords)}
        />
        <link
          rel="canonical"
          href={`${routes.category.absoluteUrl}/${kebabCase(category)}`}
        />
      </Helmet>
      <SEO />

      <EntryContent>
        <Collapse
          title={category}
          type="category"
          count={totalCount}
          posts={posts}
        />
      </EntryContent>
    </Entry>
  );
};

export default withSiteConfig(Category);

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { category: { eq: $category }, publish: { ne: false } }
      }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
