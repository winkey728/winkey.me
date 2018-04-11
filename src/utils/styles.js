import { css } from "styled-components";

export const blockquote = css`
  display: block;
  position: relative;
  margin: 0;
  padding: 15px 20px 15px 60px;
  overflow: hidden;
  border-left: 10px solid ${props => props.theme.palette.secondary.main};
  background-color: ${props => props.theme.palette.background.default};
  color: ${props => props.theme.palette.text.secondary};
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);

  &:before {
    content: "\\201C"; /*Unicode for Left Double Quote*/
    font-family: Georgia, serif;
    font-size: 60px;
    font-weight: bold;
    color: ${props => props.theme.palette.text.primary};
    position: absolute;
    left: 10px;
    top: 5px;
    display: inline-block;
    line-height: 60px;
    height: 60px;
  }
`;

export const markdown = css`
  ul:first-child,
  ol:first-child {
    margin-top: 30px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    position: relative;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-weight: normal;
    line-height: 1.4;
    cursor: text;
  }

  h1:hover a.anchor,
  h2:hover a.anchor,
  h3:hover a.anchor,
  h4:hover a.anchor,
  h5:hover a.anchor,
  h6:hover a.anchor {
    text-decoration: none;
  }

  h1 tt,
  h1 code {
    font-size: inherit;
  }

  h2 tt,
  h2 code {
    font-size: inherit;
  }

  h3 tt,
  h3 code {
    font-size: inherit;
  }

  h4 tt,
  h4 code {
    font-size: inherit;
  }

  h5 tt,
  h5 code {
    font-size: inherit;
  }

  h6 tt,
  h6 code {
    font-size: inherit;
  }

  h1 {
    padding-bottom: 0.3em;
    font-size: 2.25em;
    line-height: 1.2;
    border-bottom: 1px solid ${props => props.theme.palette.text.accent};
  }

  h2 {
    padding-bottom: 0.3em;
    font-size: 1.75em;
    line-height: 1.225;
    border-bottom: 1px solid ${props => props.theme.palette.text.accent};
  }

  h3 {
    font-size: 1.5em;
    line-height: 1.43;
  }

  h4 {
    font-size: 1.25em;
  }

  h5 {
    font-size: 1em;
  }

  h6 {
    font-size: 1em;
    color: #777;
  }

  p,
  ul,
  ol,
  dl,
  table {
    margin: 0.8em 0;
  }

  li > ol,
  li > ul {
    margin: 0 0;
  }

  hr {
    height: 1px;
    padding: 0;
    margin: 24px 0;
    background-color: ${props => props.theme.palette.text.accent};
    border: 0 none;
    overflow: hidden;
    box-sizing: content-box;
    border-bottom: 1px solid ${props => props.theme.palette.text.accent};
  }

  & > h2:first-child {
    margin-top: 0;
    padding-top: 0;
  }

  & > h1:first-child {
    margin-top: 0;
    padding-top: 0;
  }

  & > h1:first-child + h2 {
    margin-top: 0;
    padding-top: 0;
  }

  & > h3:first-child,
  & > h4:first-child,
  & > h5:first-child,
  & > h6:first-child {
    margin-top: 0;
    padding-top: 0;
  }

  a:first-child h1,
  a:first-child h2,
  a:first-child h3,
  a:first-child h4,
  a:first-child h5,
  a:first-child h6 {
    margin-top: 0;
    padding-top: 0;
  }

  h1 p,
  h2 p,
  h3 p,
  h4 p,
  h5 p,
  h6 p {
    margin-top: 0;
  }

  li p.first {
    display: inline-block;
  }

  ul,
  ol {
    padding-left: 30px;
  }

  ul:first-child,
  ol:first-child {
    margin-top: 0;
  }

  ul:last-child,
  ol:last-child {
    margin-bottom: 0;
  }

  table {
    padding: 0;
    word-break: initial;
  }

  table tr {
    border-top: 1px solid #cccccc;
    margin: 0;
    padding: 0;
  }

  table th,
  table tr:nth-child(2n) {
    background-color: ${props => props.theme.palette.background.accent};
    color: ${props => props.theme.palette.text.accent};
  }

  table tr th {
    font-weight: bold;
    border: 1px solid #cccccc;
    text-align: left;
    margin: 0;
    padding: 6px 13px;
  }

  table tr td {
    border: 1px solid #cccccc;
    text-align: left;
    margin: 0;
    padding: 6px 13px;
  }

  table tr th:first-child,
  table tr td:first-child {
    margin-top: 0;
  }

  table tr th:last-child,
  table tr td:last-child {
    margin-bottom: 0;
  }

  table tr th[align="left"],
  table tr td[align="left"] {
    text-align: left;
  }

  table tr th[align="center"],
  table tr td[align="center"] {
    text-align: center;
  }

  table tr th[align="right"],
  table tr td[align="right"] {
    text-align: right;
  }

  code,
  tt {
    background-color: #1d1f21;
    color: #2aa198;
    border-radius: 3px;
    font-family: "Source Code Pro", Mononoki, "Roboto Mono", Consolas,
      "Liberation Mono", Courier, monospace;
    padding: 0.2em 0;
    font-size: 0.9em;
  }

  .task-list-item {
    position: relative;
    list-style: none;
  }

  .task-list-item input {
    position: absolute;
    left: -23px;
    top: 50%;
    transform: translateY(-50%);
  }

  @media print {
    html {
      font-size: 13px;
    }
    table,
    pre {
      page-break-inside: avoid;
    }
    pre {
      word-wrap: break-word;
    }
  }
`;

export const codeblock = css`
  code[class*="language-"],
  pre[class*="language-"] {
    color: #c5c8c6;
    text-shadow: 0 1px rgba(0, 0, 0, 0.3);
    font-family: "Source Code Pro", Consolas, Inconsolata, Monaco, "Courier New",
      Courier, monospace;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    line-height: 1.5;
    font-size: 0.85rem;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  /* Code blocks */
  pre[class*="language-"] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
    border-radius: 0.3em;
  }

  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    background: #1d1f21;
  }

  /* Inline code */
  :not(pre) > code[class*="language-"] {
    padding: 0.1em;
    border-radius: 0.3em;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #7c7c7c;
  }

  .token.punctuation {
    color: #c5c8c6;
  }

  .namespace {
    opacity: 0.7;
  }

  .token.property,
  .token.keyword,
  .token.tag {
    color: #96cbfe;
  }

  .token.class-name {
    color: #ffffb6;
    text-decoration: underline;
  }

  .token.boolean,
  .token.constant {
    color: #99cc99;
  }

  .token.symbol,
  .token.deleted {
    color: #f92672;
  }

  .token.number {
    color: #ff73fd;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #a8ff60;
  }

  .token.variable {
    color: #c6c5fe;
  }

  .token.operator {
    color: #ededed;
  }

  .token.entity {
    color: #ffffb6;
    /* text-decoration: underline; */
  }

  .token.url {
    color: #96cbfe;
  }

  .language-css .token.string,
  .style .token.string {
    color: #87c38a;
  }

  .token.atrule,
  .token.attr-value {
    color: #f9ee98;
  }

  .token.function {
    color: #dad085;
  }

  .token.regex {
    color: #e9c062;
  }

  .token.important {
    color: #fd971f;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  /**
 * custom line highlighting implementation
 */
  .gatsby-highlight-code-line {
    background-color: #2f2f2f;
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 0.75em;
    border-left: 0.25em solid #444b52;
  }

  /**
 * Add back the container background-color, border-radius, padding, margin
 * and overflow that we removed from <pre>.
 */
  .gatsby-highlight {
    background-color: #1d1f21;
    border-radius: 0.3em;
    margin: 0.5em 0;
    padding: 1em;
    overflow: auto;
  }

  /**
 * Remove the default PrismJS theme background-color, border-radius, margin,
 * padding and overflow.
 * 1. Make the element just wide enough to fit its content.
 * 2. Always fill the visible space in .gatsby-highlight.
 */
  .gatsby-highlight pre[class*="language-"] {
    background-color: transparent;
    margin: 0;
    padding: 0;
    overflow: initial;
    float: left; /* 1 */
    min-width: 100%; /* 2 */
  }
`;

export const entry = css`
  max-width: 900px;
  margin: 0 auto;
`;

export const entryDetail = css`
  ${props => props.theme.breakpoints.up("sm")} {
    padding: 0 ${props => props.theme.spacing.unit * 3}px;
  }

  ${props => props.theme.breakpoints.up("lg")} {
    padding: 0 ${props => props.theme.spacing.unit * 5}px;
  }
`;
