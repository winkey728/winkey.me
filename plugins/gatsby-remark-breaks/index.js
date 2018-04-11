const remarkBreaks = require("remark-breaks");

module.exports = ({ markdownAST }) => markdownAST;

module.exports.setParserPlugins = () => [remarkBreaks];
