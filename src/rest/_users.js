const Router = require("@koa/router");
const userService = require("../service/user");

const getAll = async (ctx) => {
  const { limit, offset } = ctx.query;
  ctx.body = await userService.getAll(Number(limit), Number(offset));
};

const getById = async (ctx) => {
  ctx.body = await userService.getById(ctx.params.id);
};

const updateById = async (ctx) => {
  const user = await userService.updateById(ctx.params.id, ctx.request.body);
  ctx.body = user;
};

const deleteById = async (ctx) => {
  await userService.deleteById(ctx.params.id);
  ctx.status = 204;
};

const login = async (ctx) => {
  const { email, password } = ctx.request.body;
  const response = await userService.login(email, password);
  ctx.body = response;
};

const register = async (ctx) => {
  const response = await userService.register(ctx.request.body);
  ctx.body = response;
};

module.exports = (app) => {
  const router = new Router({
    prefix: "/users",
  });

  router.get("/", getAll);
  router.get("/:id", getById);
  router.put("/:id", updateById);
  router.delete("/:id", deleteById);

  router.post('/login', login);
  router.post('/register', register);

  app.use(router.routes()).use(router.allowedMethods());
};
