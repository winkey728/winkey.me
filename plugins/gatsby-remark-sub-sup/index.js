const remarkSubSuper = require("remark-sub-super");

module.exports = ({ markdownAST }) => markdownAST;

module.exports.setParserPlugins = () => [remarkSubSuper];
