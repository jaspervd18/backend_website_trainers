const Router = require("@koa/router");
const itemService = require("../service/item");

const getAllItems = async (ctx) => {
  let { limit, offset } = ctx.query;
  if (!limit || limit < 0) limit = 100;
  if (!offset || offset < 0) offset = 0;
  ctx.body = await itemService.getAll(Number(limit), Number(offset));
};

const createItem = async (ctx) => {
  const v = await ctx.validate({
    name: "required|maxLength:50",
    price: "required|decimal|min:0.01",
    korting: "required|decimal|min:0|max:0.95",
    imageUrl: "required|string",
  });

  if (v.fails()) {
    ctx.status = 422;
    ctx.body = v.errors;
  }
  ctx.status = 200;
  const newItems = await itemService.create({
    ...ctx.request.body,
  });
  ctx.body = newItems;
};

const getItemById = async (ctx) => {
  ctx.body = await itemService.getById(ctx.params.id);
};

const giveItemDiscount = async (ctx) => {
  const v = await ctx.validate({
    korting: "required|decimal|min:0|max:0.95",
  });

  if (v.fails()) {
    ctx.status = 422;
    ctx.body = v.errors;
  }
  ctx.status = 200;
  ctx.body = await itemService.giveDiscount(ctx.params.id, {
    ...ctx.request.body,
  });
};

const deleteItem = async (ctx) => {
  await itemService.deleteById(ctx.params.id);
  ctx.status = 204;
};

module.exports = (app) => {
  const router = new Router({
    prefix: "/items",
  });

  router.get("/", getAllItems);
  router.post("/", createItem);
  router.get("/:id", getItemById);
  router.put("/:id", giveItemDiscount);
  router.delete("/:id", deleteItem);

  app.use(router.routes()).use(router.allowedMethods());
};
