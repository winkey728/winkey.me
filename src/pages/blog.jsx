import React from "react";
import Grid from "material-ui/Grid";
import Helmet from "react-helmet";
import R from "ramda";
import PostLink from "../components/PostLink";
import SEO from "../components/SEO";
import { withSiteConfig } from "../components/SiteConfig";

const Blog = ({
  data: { allMarkdownRemark: { edges } },
  siteConfig: { siteMetas, routes }
}) => (
  <Grid container spacing={24}>
    {/* SEO */}
    <Helmet>
      <title>{`博客 | ${siteMetas.title}`}</title>
      <meta name="keywords" content={R.join(", ")(siteMetas.keywords)} />
      <link rel="canonical" href={routes.blog.absoluteUrl} />
    </Helmet>
    <SEO />

    {R.map(
      R.pipe(
        edge => ({
          id: edge.node.id,
          title: edge.node.frontmatter.title,
          date: edge.node.frontmatter.date,
          path: edge.node.fields.slug,
          cover: edge.node.frontmatter.cover,
          category: edge.node.frontmatter.category,
          tags: edge.node.frontmatter.tags,
          excerpt: edge.node.excerpt
        }),
        post => (
          <Grid key={post.id} item xs={12} lg={6}>
            <PostLink post={post} />
          </Grid>
        )
      )
    )(edges)}
  </Grid>
);

export default withSiteConfig(Blog);

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { publish: { ne: false } } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            title
            date
            cover
            category
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
