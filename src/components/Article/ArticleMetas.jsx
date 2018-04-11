import React from "react";
import styled from "styled-components";
import { CardHeader } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Avatar from "material-ui/Avatar";
import Today from "material-ui-icons/Today";
import Apps from "material-ui-icons/Apps";
import kebabCase from "lodash.kebabcase";
import Link from "../MyLink";
import Datetime from "../Datetime";
import { withSiteConfig } from "../SiteConfig";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1pc;
`;

const VerticalDivider = styled.span`
  border-left: ${props => props.theme.palette.text.secondary} solid 1px;
  margin: 0 0.8rem;
`;

const CategoryIcon = styled(Apps)`
  margin-right: ${props => props.theme.spacing.unit}px;
`;

const ArticleMetas = ({
  category,
  created,
  lastModified,
  siteConfig: { routes }
}) => (
  <Wrapper>
    <CardHeader
      avatar={
        <Avatar>
          <Today />
        </Avatar>
      }
      title={
        <span>
          发布于 <Datetime datetime={created} format="MMMM DD, YYYY" />
        </span>
      }
      subheader={
        <span>
          最后修改{" "}
          <Datetime datetime={lastModified} format="YYYY/MM/DD HH:mm" />
        </span>
      }
    />
    <Link to={`${routes.category.path}/${kebabCase(category)}`}>
      <Button size="small">
        <CategoryIcon />
        {category}
      </Button>
    </Link>
  </Wrapper>
);

export default withSiteConfig(ArticleMetas);
