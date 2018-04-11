const dedent = require("dedent");
const R = require("ramda");
const urljoin = require("./url-join");

function makeRoutes(routeArray) {
  const reduceToUrlBy = R.reduceBy((acc, route) => {
    const slug = R.values(route)[0];

    return {
      path: slug,
      absoluteUrl: urljoin(siteMetas.url, siteMetas.prefix, slug)
    };
  }, {});
  const reduceByPage = reduceToUrlBy(route => Object.keys(route)[0]);
  return reduceByPage(routeArray);
}

const siteMetas = {
  url: "https://winkey.me",
  prefix: "/",
  title: "Winkeyの花鸟鱼虫街",
  titleAlt: "Winkeyの花鸟鱼虫街",
  logo: "/logos/logo-1024.png",
  keywords: ["Winkey", "Blog", "Material Design"],
  description:
    "Hello World! 我是 Winkey，一个内向，有点宅的80后90前 Javaer。有点完美主义，颜控，可爱控，爱好看电影、电视剧和足球。喜欢自由，喜欢思考，但有时想的太多做的太少。"
};

const routes = makeRoutes([
  { home: "/" },
  { blog: "/blog" },
  { category: "/categories" },
  { tag: "/tags" },
  { about: "/about" },
  { rss: "/rss.xml" }
]);

const author = {
  name: "Winkey",
  maxim: "Thought is cheap, show the work.",
  socialLinks: [
    {
      label: "GitHub",
      name: "winkey728",
      url: "https://github.com/winkey728",
      iconName: "github"
    },
    {
      label: "Weibo",
      name: "Winkey_Wong",
      url: "http://weibo.com/winkey728",
      iconName: "weibo"
    },
    {
      label: "Email",
      name: "winkeyme@163.com",
      url: "mailto:winkeyme@163.com",
      iconName: "email"
    },
    {
      label: "RSS",
      name: "feed",
      url: routes.rss.absoluteUrl,
      iconName: "rss"
    }
  ]
};

const googleAnalytics = {
  trackingId: "UA-116922508-1"
};

const gitalk = {
  clientID: process.env.GATSBY_GITALK_CLIENT_ID || "",
  clientSecret: process.env.GATSBY_GITALK_CLIENT_SECRET || "",
  repo: "blog-posts",
  owner: process.env.GATSBY_GITALK_OWNER || "",
  admin: R.split(",", process.env.GATSBY_GITALK_ADMIN || "")
};

module.exports = {
  // SEO informations.
  siteMetas,

  // URLs of all pages.
  routes,

  // Controlls the links showing in the SpeedDial and the Navigation.
  navigationLinks: [
    {
      label: "首页",
      url: routes.home.path,
      icon: "Home",
      display: true,
      speedDial: false
    },
    {
      label: "博客",
      url: routes.blog.path,
      icon: "List",
      display: true,
      speedDial: true
    },
    {
      label: "分类",
      url: routes.category.path,
      icon: "Apps",
      display: true,
      speedDial: true
    },
    {
      label: "标签",
      url: routes.tag.path,
      icon: "LocalOffer",
      display: true,
      speedDial: true
    },
    {
      label: "关于",
      url: routes.about.path,
      icon: "Person",
      display: true,
      speedDial: true
    }
  ],

  // Data showing in Navigation and Footer.
  author,

  // Data showing in the About page.
  about: [
    {
      label: "我是谁",
      content: dedent`
        Hello World! 我是 Winkey，一个内向，有点宅的80后90前 Javaer。
        有点完美主义，颜控，可爱控，爱好看电影、电视剧和足球。
        喜欢自由，喜欢思考，但有时想的太多做的太少。
      `
    },
    {
      label: "我从哪里来",
      content: dedent`
        大学学的是自动化，非计算机专业出身，毕业后，决定走上了程序员这条不归路。
        因为只学了 C 和汇编，最开始做的是嵌入式方面的开发，1年后因当时公司的需要转到 Android。
        但慢慢地发现更喜欢 Web 开发，所以 15 年又转做后端的 Javaer。
      `
    },
    {
      label: "我到哪里去",
      content: dedent`
        能码一辈子的代码，是我的梦想。
        不想太多，只求能在码农界留下一点点痕迹。
      `
    }
  ],

  // Google Analytics
  googleAnalytics,

  // Github API tokens for gitalk
  gitalk
};
