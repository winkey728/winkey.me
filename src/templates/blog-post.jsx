import React from "react";
import styled from "styled-components";
import R from "ramda";
import Helmet from "react-helmet";
import Article from "../components/Article";
import PostSider from "../components/PostSider";
import SEO from "../components/SEO";
import { withSiteConfig } from "../components/SiteConfig";

const BlogTemplate = ({
  data: { markdownRemark: { frontmatter, html, excerpt, fields } },
  siteConfig: { routes }
}) => {
  const post = {
    title: frontmatter.title,
    cover: frontmatter.cover,
    slug: fields.slug,
    category: frontmatter.category,
    tags: frontmatter.tags,
    excerpt,
    html,
    created: frontmatter.date,
    lastModified: fields.lastModified,
    next: {
      title: fields.nextTitle,
      slug: fields.nextSlug
    },
    prev: {
      title: fields.prevTitle,
      slug: fields.prevSlug
    }
  };

  return (
    <article>
      <Helmet>
        <title>{post.title}</title>
        <meta name="keywords" content={R.join(", ")(post.tags)} />
        <link rel="canonical" href={`${routes.blog.absoluteUrl}${post.slug}`} />
      </Helmet>
      <SEO postSlug={post.slug} post={post} postSEO />
      <Article post={post} />
      <PostSider />
    </article>
  );
};

export default withSiteConfig(BlogTemplate);

export const pageQuery = graphql`
  query BlogPostByPath($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 250)
      html
      frontmatter {
        title
        date
        cover
        category
        tags
      }
      fields {
        slug
        lastModified
        nextTitle
        nextSlug
        prevTitle
        prevSlug
      }
    }
  }
`;
