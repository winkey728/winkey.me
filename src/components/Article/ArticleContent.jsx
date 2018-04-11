import React from "react";
import styled from "styled-components";
import { blockquote, markdown, codeblock } from "../../utils/styles";

import "katex/dist/katex.min.css";

const ArticleContent = styled.main`
  blockquote {
    ${blockquote};
  }

  ${markdown};

  ${codeblock};

  .gatsby-resp-image-wrapper {
    z-index: 10 !important;
  }
`;

export default ArticleContent;
