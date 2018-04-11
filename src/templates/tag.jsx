import React from "react";
import Helmet from "react-helmet";
import R from "ramda";
import kebabCase from "lodash.kebabcase";
import Entry, { EntryContent } from "../components/Entry";
import Collapse from "../components/PostCollapse";
import SEO from "../components/SEO";
import { withSiteConfig } from "../components/SiteConfig";

const Tag = ({ pathContext, data, siteConfig }) => {
  const { tag } = pathContext;
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
        <title>{`文章标签: ${tag} | ${siteMetas.title}`}</title>
        <meta
          name="keywords"
          content={R.pipe(R.join(", "), R.append(tag))(siteMetas.keywords)}
        />
        <link
          rel="canonical"
          href={`${routes.tag.absoluteUrl}/${kebabCase(tag)}`}
        />
      </Helmet>
      <SEO />

      <EntryContent>
        <Collapse title={tag} type="tag" count={totalCount} posts={posts} />
      </EntryContent>
    </Entry>
  );
};

export default withSiteConfig(Tag);

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { eq: $tag }, publish: { ne: false } } }
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
