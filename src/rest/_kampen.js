const Router = require("@koa/router");
const kampService = require("../service/Kamp");

const getAllKampen = async (ctx) => {
  let { limit, offset } = ctx.query;
  if (!limit || limit < 0) limit = 100;
  if (!offset || offset < 0) offset = 0;
  ctx.body = await kampService.getAll(Number(limit), Number(offset));
};

const createKamp = async (ctx) => {
  const v = await ctx.validate({
    datum: "required|maxLength:50",
    dag: "required|maxLength:50",
  });

  if (v.fails()) {
    ctx.status = 422;
    ctx.body = v.errors;
  }
  ctx.status = 200;
  const newKampen = await kampService.create({
    ...ctx.request.body,
  });
  ctx.body = newKampen;
};

const getKampById = async (ctx) => {
  ctx.body = await kampService.getById(ctx.params.id);
};

const updateKampById = async (ctx) => {
  const v = await ctx.validate({
    datum: "required|maxLength:50",
    dag: "required|maxLength:50",
  });

  if (v.fails()) {
    ctx.status = 422;
    ctx.body = v.errors;
  }
  ctx.status = 200;
  ctx.body = await kampService.updateById(ctx.params.id, {
    ...ctx.request.body,
  });
};

const deleteKamp = async (ctx) => {
  await kampService.deleteById(ctx.params.id);
  ctx.status = 204;
};

module.exports = (app) => {
  const router = new Router({
    prefix: "/kampen",
  });

  router.get("/", getAllKampen);
  router.post("/", createKamp);
  router.get("/:id", getKampById);
  router.put("/:id", updateKampById);
  router.delete("/:id", deleteKamp);

  app.use(router.routes()).use(router.allowedMethods());
};
