import React from "react";
import styled from "styled-components";
import Img from "gatsby-image";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import Helmet from "react-helmet";
import R from "ramda";
import Link from "../components/MyLink";
import Comment from "../components/Comment";
import { EntryDetail, EntryContent } from "../components/Entry";
import SEO from "../components/SEO";
import { withSiteConfig } from "../components/SiteConfig";

const TitleWrapper = styled.div`
  position: relative;
  display: flex;
  padding: 1rem 1.2rem;
  align-items: flex-end;
  height: 240px;
  color: #fff;
`;

const Title = ({ image }) => (
  <TitleWrapper>
    <Img
      style={{
        top: 0,
        left: 0,
        right: 0,
        zIndex: 0,
        position: `absolute`,
        height: `100%`
      }}
      sizes={image}
    />
    <Typography style={{ zIndex: 0 }} variant="title" color="inherit">
      About Me
    </Typography>
  </TitleWrapper>
);

const IntroWrapper = styled.div`
  margin-top: ${props => props.theme.spacing.unit * 3}px;
`;

const IntroHeading = styled(Typography)`
  && {
    margin-bottom: 0.5rem;
    padding-bottom: 0.3em;
    border-bottom: 1px solid ${props => props.theme.palette.text.secondary};
  }
`;

const IntroContent = styled(Typography)`
  && {
    font-size: 1rem;
    line-height: 1.7;
  }
`;

const Intro = ({ title, content }) => (
  <IntroWrapper>
    <IntroHeading variant="display1">{title}</IntroHeading>
    <IntroContent style={{ whiteSpace: "pre-line" }}>{content}</IntroContent>
  </IntroWrapper>
);

const Divider = styled.div`
  margin: 40px 0;
  border-top: 4px solid #93a1a1;
`;

const About = ({
  data: { titleImage: { sizes } },
  siteConfig: { siteMetas, routes, about, author }
}) => (
  <EntryDetail>
    {/* SEO */}
    <Helmet>
      <title>{`关于 | ${siteMetas.title}`}</title>
      <meta name="keywords" content={R.join(", ")(siteMetas.keywords)} />
      <link rel="canonical" href={routes.about.absoluteUrl} />
    </Helmet>
    <SEO />

    <Title image={sizes} />
    <EntryContent>
      {R.map(intro => (
        <Intro key={intro.label} title={intro.label} content={intro.content} />
      ))(about)}
      <Divider />
      <Intro
        title="联系方式"
        content={R.map(link => (
          <span style={{ display: "block" }} key={link.label}>
            <strong>{link.label}</strong>:&nbsp;
            <Link to={link.url} external>
              {link.name}
            </Link>
          </span>
        ))(author.socialLinks)}
      />
      <Comment title="About | 关于我" />
    </EntryContent>
  </EntryDetail>
);

export default withSiteConfig(About);

export const pageQuery = graphql`
  query AboutQuery {
    titleImage: imageSharp(id: { regex: "/Anime-aboutme/" }) {
      sizes(maxWidth: 900) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
