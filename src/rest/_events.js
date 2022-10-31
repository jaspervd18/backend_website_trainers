const Router = require("@koa/router");
const eventService = require("../service/event");

const getAllEvents = async (ctx) => {
  let { limit, offset } = ctx.query;
  if (!limit || limit < 0) limit = 100;
  if (!offset || offset < 0) offset = 0;
  ctx.body = await eventService.getAll(Number(limit), Number(offset));
};

const createEvent = async (ctx) => {
  const v = await ctx.validate({
    soort: "required|maxLength:50",
    datum: "required|maxLength:50",
  });

  if (v.fails()) {
    ctx.status = 422;
    ctx.body = v.errors;
  }
  ctx.status = 200;
  const newEvents = await eventService.create({
    ...ctx.request.body,
  });
  ctx.body = newEvents;
};

const getEventById = async (ctx) => {
  ctx.body = await eventService.getById(ctx.params.id);
};

const updateEventById = async (ctx) => {
  const v = await ctx.validate({
    korting: "required|decimal|min:0|max:0.95",
  });

  if (v.fails()) {
    ctx.status = 422;
    ctx.body = v.errors;
  }
  ctx.status = 200;
  ctx.body = await eventService.giveDiscount(ctx.params.id, {
    ...ctx.request.body,
  });
};

const deleteEvent = async (ctx) => {
  await eventService.deleteById(ctx.params.id);
  ctx.status = 204;
};

module.exports = (app) => {
  const router = new Router({
    prefix: "/events",
  });

  router.get("/", getAllEvents);
  router.post("/", createEvent);
  router.get("/:id", getEventById);
  router.put("/:id", updateEventById);
  router.delete("/:id", deleteEvent);

  app.use(router.routes()).use(router.allowedMethods());
};
