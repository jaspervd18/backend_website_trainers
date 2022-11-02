const Router = require("@koa/router");
const installTrainingRouter = require("./_trainingen");
const installWedstrijdRouter = require("./_wedstrijden");
const installKampRouter = require("./_kampen");
const installUserRouter = require("./_users");

module.exports = (app) => {
  const router = new Router({
    prefix: "/api",
  });

  installTrainingRouter(router);
  installWedstrijdRouter(router);
  installKampRouter(router);
  installUserRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};
