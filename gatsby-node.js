const fs = require("fs");
const path = require("path");
const util = require("util");
const git = require("simple-git/promise");
const { createFilePath } = require(`gatsby-source-filesystem`);
const kebabCase = require("lodash.kebabcase");
const R = require("ramda");
const { routes } = require("./src/utils/siteConfig");

const postNodes = [];

function addSiblingNodes(createNodeField) {
  postNodes.sort(
    ({ frontmatter: { date: date1 } }, { frontmatter: { date: date2 } }) =>
      new Date(date1) - new Date(date2)
  );

  for (let i = 0; i < postNodes.length; i += 1) {
    const nextID = i + 1 < postNodes.length ? i + 1 : null;
    const prevID = i - 1 > 0 ? i - 1 : null;
    const currNode = postNodes[i];
    const nextNode = nextID && postNodes[nextID];
    const prevNode = prevID && postNodes[prevID];

    createNodeField({
      node: currNode,
      name: "nextTitle",
      value: nextNode ? nextNode.frontmatter.title : ""
    });
    createNodeField({
      node: currNode,
      name: "nextSlug",
      value: nextNode ? nextNode.fields.slug : ""
    });
    createNodeField({
      node: currNode,
      name: "prevTitle",
      value: prevNode ? prevNode.frontmatter.title : ""
    });
    createNodeField({
      node: currNode,
      name: "prevSlug",
      value: prevNode ? prevNode.fields.slug : ""
    });
  }
}

exports.setFieldsOnGraphQLNodeType = ({ type, boundActionCreators }) => {
  const { name } = type;
  const { createNodeField } = boundActionCreators;
  if (name === "MarkdownRemark") {
    addSiblingNodes(createNodeField);
  }
};

exports.onCreateNode = async ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);

    const log = await git(fileNode.dir).log({
      n: "1",
      file: fileNode.base
    });

    let mtime = log && log.latest && log.latest.date;
    if (mtime) {
      mtime = new Date(mtime.trim()).toISOString();
    } else {
      mtime = fs.statSync(node.fileAbsolutePath).mtime;
    }

    let slug;
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "slug")
    ) {
      slug = `/${kebabCase(node.frontmatter.slug)}`;
    } else if (parsedFilePath.name !== "index") {
      slug = `/${parsedFilePath.name}`;
    } else if (parsedFilePath.dir != "") {
      const splitedPath = parsedFilePath.dir.split(`--`);
      slug =
        splitedPath.length == 2
          ? `/${splitedPath[1]}`
          : `/${parsedFilePath.dir}`;
    } else {
      slug = `/${parsedFilePath.dir}`;
    }

    createNodeField({ node, name: "slug", value: slug });
    createNodeField({ node, name: "lastModified", value: mtime });
    postNodes.push(node);
  }
};

exports.onCreatePage = async ({ page, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    if (page.path.match(/^\/$/)) {
      page.layout = "index";
    } else {
      page.layout = "drawer";
    }
    createPage(page);

    resolve();
  });
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  const blogPostTemplate = path.resolve("src/templates/blog-post.jsx");
  const categoryTemplate = path.resolve("src/templates/category.jsx");
  const tagTemplate = path.resolve("src/templates/tag.jsx");

  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { publish: { ne: false } } }
      ) {
        edges {
          node {
            frontmatter {
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
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    // Create post detail pages
    posts.forEach(({ node }) => {
      createPage({
        path: `${routes.blog.path}${node.fields.slug}`,
        component: blogPostTemplate,
        layout: "drawer",
        context: {
          slug: node.fields.slug
        }
      });
    });

    // Category pages:
    let categories = R.reduce(
      (acc, edge) => {
        if (R.path(["node", "frontmatter", "category"])(edge)) {
          return R.append(edge.node.frontmatter.category)(acc);
        }
        return acc;
      },
      [],
      posts
    );
    // Eliminate duplicate categories
    categories = R.uniq(categories);
    R.forEach(category => {
      createPage({
        path: `${routes.category.path}/${kebabCase(category)}`,
        component: categoryTemplate,
        layout: "drawer",
        context: { category }
      });
    })(categories);

    // Tags pages:
    let tags = R.reduce(
      (acc, edge) => {
        if (R.path(["node", "frontmatter", "tags"])(edge)) {
          return R.concat(edge.node.frontmatter.tags)(acc);
        }
        return acc;
      },
      [],
      posts
    );
    // Eliminate duplicate categories
    tags = R.uniq(tags);
    R.forEach(tag => {
      createPage({
        path: `${routes.tag.path}/${kebabCase(tag)}`,
        component: tagTemplate,
        layout: "drawer",
        context: { tag }
      });
    })(tags);
  });
};
