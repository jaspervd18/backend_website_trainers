const Router = require("@koa/router");
const installItemRouter = require("./_items");
const installUserRouter = require("./_users");
const installOrderRouter = require("./_order");

module.exports = (app) => {
  const router = new Router({
    prefix: "/api",
  });

  installUserRouter(router);
  installItemRouter(router);
  installOrderRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};
