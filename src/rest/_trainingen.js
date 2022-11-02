const Router = require("@koa/router");
const trainingService = require("../service/training");

const getAllTrainingen = async (ctx) => {
  let { limit, offset } = ctx.query;
  if (!limit || limit < 0) limit = 100;
  if (!offset || offset < 0) offset = 0;
  ctx.body = await trainingService.getAll(Number(limit), Number(offset));
};

const createTraining = async (ctx) => {
  const v = await ctx.validate({
    datum: "required|maxLength:50",
    dag: "required|maxLength:50",
  });

  if (v.fails()) {
    ctx.status = 422;
    ctx.body = v.errors;
  }
  ctx.status = 200;
  const newTrainingen = await trainingService.create({
    ...ctx.request.body,
  });
  ctx.body = newTrainingen;
};

const getTrainingById = async (ctx) => {
  ctx.body = await trainingService.getById(ctx.params.id);
};

const getTrainingenByDate = async (ctx) => {
  ctx.body = await trainingService.getByDate(ctx.params.date);
};

const updateTrainingById = async (ctx) => {
  const v = await ctx.validate({
    datum: "required|maxLength:50",
    dag: "required|maxLength:50",
  });

  if (v.fails()) {
    ctx.status = 422;
    ctx.body = v.errors;
  }
  ctx.status = 200;
  ctx.body = await trainingService.updateById(ctx.params.id, {
    ...ctx.request.body,
  });
};

const deleteTraining = async (ctx) => {
  await trainingService.deleteById(ctx.params.id);
  ctx.status = 204;
};

module.exports = (app) => {
  const router = new Router({
    prefix: "/trainingen",
  });

  router.get("/", getAllTrainingen);
  router.post("/", createTraining);
  router.get("/:id", getTrainingById);
  router.get("/date/:date", getTrainingenByDate);
  router.put("/:id", updateTrainingById);
  router.delete("/:id", deleteTraining);

  app.use(router.routes()).use(router.allowedMethods());
};
