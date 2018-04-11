# winkey.me

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/) [![node.js >= 8.0](https://img.shields.io/badge/node.js-8.0%2B-brightgreen.svg)](https://nodejs.org) [![Website https://winkey.me](https://img.shields.io/website-up-down-green-red/https/winkey.me.svg?label=winkey.me)](https://winkey.me)



[My blog](https://winkey.me) starter with Material Design for Gatsby. 

The theme is designed by myself and largely based on the [solarized](http://ethanschoonover.com/solarized) colors. Star if you like it.



The blog posts are left alone in [this](https://github.com/winkey728/blog-posts) repository.



## Get started

Create a `.env.development` file in project root:

```properties
GATSBY_GITALK_CLIENT_ID=Your gitalk client id here
GATSBY_GITALK_CLIENT_SECRET=Your gitalk client secret here
GATSBY_GITALK_OWNER=Your github repo owner here
GATSBY_GITALK_ADMIN=Github repo owner and collaborators, can be seperated by ","
```

This provides the necessary environment variables  for the project. For more information please read [Gatsby Environment Variables](https://www.gatsbyjs.org/docs/environment-variables/) and [Gitalk Usage](https://github.com/gitalk/gitalk#usage)

And then run:

```bash
npm install
npm run filldata
npm run develop
```



## Deploy

You can provide those environment variables by exporting them in the static site hosts, or create a `.env.production` file just like `.env.development`.

Then run this command to build the project:

```bash
npm run filldata && gatsby build
```

Last, follow [this](https://www.gatsbyjs.org/docs/deploy-gatsby/) guide to depoly.



## Thanks

[Gatsby](https://gatsbyjs.org)

[Material UI](https://material-ui-next.com/)

[Styled Components](https://www.styled-components.com/)

[Gitalk](https://gitalk.github.io/)

