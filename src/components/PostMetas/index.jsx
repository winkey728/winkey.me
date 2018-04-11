import React from "react";
import Link from "../MyLink";
import styled from "styled-components";
import Button from "material-ui/Button";
import kebabCase from "lodash.kebabcase";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Meta = styled(Button).attrs({
  size: "small"
})`
  && {
    padding: 2px 4px;
    min-width: 36px;
    height: 24px;
    min-height: 24px;
  }
`;

const LinkedMeta = ({ path, meta }) => (
  <Link style={{ marginLeft: 4 }} to={`${path}/${kebabCase(meta)}`}>
    <Meta>{meta}</Meta>
  </Link>
);

const PostMetas = ({ path, icon, metas }) => (
  <Wrapper>
    {icon}
    {typeof metas == "string" ? (
      <LinkedMeta path={path} meta={metas} />
    ) : (
      metas.map(meta => <LinkedMeta key={meta} path={path} meta={meta} />)
    )}
  </Wrapper>
);

export default PostMetas;
