const Router = require("@koa/router");
const installEventRouter = require("./_events");
const installUserRouter = require("./_users");

module.exports = (app) => {
  const router = new Router({
    prefix: "/api",
  });

  installEventRouter(router);
  installUserRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};
