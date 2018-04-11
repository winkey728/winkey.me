import React from "react";
import Helmet from "react-helmet";
import { withSiteConfig } from "../SiteConfig";

const SEO = ({ post, postSlug, postSEO, siteConfig }) => {
  let title;
  let description;
  let image;
  let postURL;
  const { siteMetas, routes, facebook, twitter } = siteConfig;

  if (postSEO) {
    title = post.title;
    description = post.excerpt;
    image = post.cover;
    postURL = `${routes.blog.absoluteUrl}${postSlug}`;
  } else {
    title = siteMetas.siteTitle;
    description = siteMetas.description;
    image = siteMetas.url + siteMetas.siteLogo;
  }

  const homeURL = routes.home.absoluteUrl;
  const schemaOrgJSONLD = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: homeURL,
      name: title,
      alternateName: siteMetas.titleAlt ? siteMetas.titleAlt : ""
    }
  ];

  if (postSEO) {
    schemaOrgJSONLD.push([
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": postURL,
              name: title,
              image
            }
          }
        ]
      },
      {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        url: homeURL,
        name: title,
        alternateName: siteMetas.titleAlt ? siteMetas.titleAlt : "",
        headline: title,
        image: {
          "@type": "ImageObject",
          url: image
        },
        description
      }
    ]);
  }

  return (
    <Helmet>
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:locale" content="de_DE" />
      <meta property="og:site_name" content={siteMetas.title} />
      <meta property="og:url" content={postSEO ? postURL : homeURL} />
      {postSEO ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Facebook tags */}
      <meta
        property="fb:app_id"
        content={facebook && facebook.appId ? facebook.appId : ""}
      />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitter ? twitter : ""} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={siteMetas.url} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default withSiteConfig(SEO);
