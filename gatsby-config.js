const {
  siteMetas,
  routes,
  author,
  googleAnalytics
} = require("./src/utils/siteConfig");

module.exports = {
  pathPrefix: siteMetas.prefix,
  siteMetadata: {
    siteUrl: siteMetas.url,
    rssMetadata: {
      site_url: routes.home.absoluteUrl,
      feed_url: routes.rss.absoluteUrl,
      title: siteMetas.title,
      description: siteMetas.description,
      image_url: `${routes.home.absoluteUrl}/icons/icon-512.png`,
      author: author.name,
      copyright: "Copyright © 2018. Winkey"
    }
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "GatsbyJS",
        short_name: "GatsbyJS",
        start_url: "/",
        background_color: "#f7f0eb",
        theme_color: "#a2466c",
        display: "minimal-ui",
        icons: [
          {
            src: `/icons/icon-192.png`,
            sizes: `192x192`,
            type: `image/png`
          },
          {
            src: `/icons/icon-512.png`,
            sizes: `512x512`,
            type: `image/png`
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/favicon.png",
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: false
        }
      }
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#ff9800`
      }
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: googleAnalytics.trackingId
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1200
            }
          },
          "gatsby-remark-responsive-iframe",
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-autolink-headers",
          "gatsby-remark-katex",
          "gatsby-remark-numbered-footnotes",
          "gatsby-remark-gemoji-to-emoji",
          "gatsby-remark-sub-sup",
          "gatsby-remark-breaks"
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `img`,
        path: `${__dirname}/assets/`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-feed",
      options: {
        setup(ref) {
          const ret = ref.query.site.siteMetadata.rssMetadata;
          ret.allMarkdownRemark = ref.query.allMarkdownRemark;
          ret.generator = "GatsbyJS";
          return ret;
        },
        query: `
        {
          site {
            siteMetadata {
              rssMetadata {
                site_url
                feed_url
                title
                description
                image_url
                author
                copyright
              }
            }
          }
        }`,
        feeds: [
          {
            serialize(ctx) {
              const rssMetadata = ctx.query.site.siteMetadata.rssMetadata;
              return ctx.query.allMarkdownRemark.edges.map(edge => ({
                categories: edge.node.frontmatter.tags,
                date: edge.node.frontmatter.date,
                title: edge.node.frontmatter.title,
                description: edge.node.excerpt,
                author: rssMetadata.author,
                url: routes.blog.absoluteUrl + edge.node.fields.slug,
                guid: routes.blog.absoluteUrl + edge.node.fields.slug,
                custom_elements: [{ "content:encoded": edge.node.html }]
              }));
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { fields: [frontmatter___date], order: DESC },
                filter: { frontmatter: { publish: { ne: false } } }
              ) {
                edges {
                  node {
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
                    }
                  }
                }
              }
            }
          `,
            output: routes.rss.path
          }
        ]
      }
    }
  ]
};
