const Router = require("@koa/router");
const wedstrijdService = require("../service/Wedstrijd");

const getAllWedstrijden = async (ctx) => {
  let { limit, offset } = ctx.query;
  if (!limit || limit < 0) limit = 100;
  if (!offset || offset < 0) offset = 0;
  ctx.body = await wedstrijdService.getAll(Number(limit), Number(offset));
};

const createWedstrijd = async (ctx) => {
  const v = await ctx.validate({
    datum: "required|maxLength:50",
    dag: "required|maxLength:50",
    naam: "required|maxLength:50",
  });

  if (v.fails()) {
    ctx.status = 422;
    ctx.body = v.errors;
  }
  ctx.status = 200;
  const newWedstrijden = await wedstrijdService.create({
    ...ctx.request.body,
  });
  ctx.body = newWedstrijden;
};

const getWedstrijdById = async (ctx) => {
  ctx.body = await wedstrijdService.getById(ctx.params.id);
};

const updateWedstrijdById = async (ctx) => {
  const v = await ctx.validate({
    datum: "required|maxLength:50",
    dag: "required|maxLength:50",
    naam: "required|maxLength:50",
  });

  if (v.fails()) {
    ctx.status = 422;
    ctx.body = v.errors;
  }
  ctx.status = 200;
  ctx.body = await wedstrijdService.updateById(ctx.params.id, {
    ...ctx.request.body,
  });
};

const deleteWedstrijd = async (ctx) => {
  await wedstrijdService.deleteById(ctx.params.id);
  ctx.status = 204;
};

module.exports = (app) => {
  const router = new Router({
    prefix: "/wedstrijden",
  });

  router.get("/", getAllWedstrijden);
  router.post("/", createWedstrijd);
  router.get("/:id", getWedstrijdById);
  router.put("/:id", updateWedstrijdById);
  router.delete("/:id", deleteWedstrijd);

  app.use(router.routes()).use(router.allowedMethods());
};
