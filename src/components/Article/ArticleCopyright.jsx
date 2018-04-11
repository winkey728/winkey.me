import React from "react";
import styled from "styled-components";
import Link from "../MyLink";
import { withSiteConfig } from "../SiteConfig";
import { blockquote } from "../../utils/styles";

const Wrapper = styled.blockquote`
  ${blockquote};
  margin-top: 40px;
`;

const List = styled.ul`
  margin-left: 0;
  list-style: none;
`;

const Declare = ({ label, content }) => (
  <li>
    <strong>{label}</strong>
    {content}
  </li>
);

const ArticleCopyright = ({ slug, siteConfig: { routes } }) => {
  const pageUrl = `${routes.blog.absoluteUrl}${slug}`;

  return (
    <Wrapper>
      <List>
        <Declare label="本文作者：" content="Winkey" />
        <Declare
          label="本文链接："
          content={
            <Link to={pageUrl} external>
              {pageUrl}
            </Link>
          }
        />
        <Declare
          label="版权声明："
          content={
            <span>
              本博客所有文章除特别声明外，均采用&nbsp;
              <Link to="https://creativecommons.org/licenses/by/4.0/" external>
                知识共享署名4.0
              </Link>
              &nbsp;国际许可协议。转载请注明出处！
            </span>
          }
        />
      </List>
    </Wrapper>
  );
};

export default withSiteConfig(ArticleCopyright);
