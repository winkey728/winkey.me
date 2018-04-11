import React from "react";
import styled from "styled-components";
import Paper from "material-ui/Paper";
import Title from "./ArticleTitle";
import Metas from "./ArticleMetas";
import Content from "./ArticleContent";
import Copyright from "./ArticleCopyright";
import Tags from "./ArticleTags";
import Nav from "./ArticleNav";
import { EntryDetail, EntryContent } from "../Entry";
import Comment from "../Comment";

const Article = ({ post }) => (
  <EntryDetail>
    <Title title={post.title} backgroundImage={post.cover} />
    <Metas
      category={post.category}
      created={post.created}
      lastModified={post.lastModified}
    />
    <EntryContent>
      <Content dangerouslySetInnerHTML={{ __html: post.html }} />
      <Copyright slug={post.slug} />
      <Tags tags={post.tags} />
      <Nav prev={post.prev} next={post.next} />
      <Comment title={post.title} />
    </EntryContent>
  </EntryDetail>
);

export default Article;
