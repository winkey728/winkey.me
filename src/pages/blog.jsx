import React, { Component } from "react";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import Helmet from "react-helmet";
import R from "ramda";
import PostLink from "../components/PostLink";
import SEO from "../components/SEO";
import { withSiteConfig } from "../components/SiteConfig";

class Blog extends Component {
  static defaultProps = {
    postsPerPage: 6,
    loadMoreThreshold: 100
  };

  state = {
    hasMorePosts:
      this.props.data.allMarkdownRemark.edges.length > this.props.postsPerPage,
    showCount: this.props.postsPerPage
  };

  update() {
    const {
      postsPerPage,
      loadMoreThreshold,
      data: {
        allMarkdownRemark: { edges }
      }
    } = this.props;
    const { showCount } = this.state;

    const scrollbarHeight =
      window.innerHeight * (window.innerHeight / document.body.offsetHeight);
    const scrollBottomY = window.scrollY + scrollbarHeight;
    const distanceToBottom = document.body.scrollHeight - scrollBottomY;

    if (distanceToBottom < loadMoreThreshold) {
      const newShowCount = showCount + postsPerPage;
      const postsLength = edges.length;

      this.setState({
        hasMorePosts: newShowCount < postsLength,
        showCount: Math.min(newShowCount, postsLength)
      });
    }
    this.ticking = false;
  }

  handleScroll = () => {
    if (this.state.hasMorePosts && !this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => this.update());
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    const {
      postsPerPage,
      data: {
        allMarkdownRemark: { edges }
      },
      siteConfig: { siteMetas, routes }
    } = this.props;
    const { showCount } = this.state;

    const postLinks = R.map(
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
    );

    return (
      <Grid container spacing={24}>
        {/* SEO */}
        <Helmet>
          <title>{`博客 | ${siteMetas.title}`}</title>
          <meta name="keywords" content={R.join(", ")(siteMetas.keywords)} />
          <link rel="canonical" href={routes.blog.absoluteUrl} />
        </Helmet>
        <SEO />

        {R.pipe(R.slice(0, showCount), postLinks)(edges)}
      </Grid>
    );
  }
}

export default withSiteConfig(Blog);

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(
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
