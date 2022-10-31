const Router = require("@koa/router");
const orderService = require("../service/order");

const getAllOrders = async (ctx) => {
  let { limit, offset } = ctx.query;
  if (!limit || limit < 0) limit = 100;
  if (!offset || offset < 0) offset = 0;
  ctx.body = await orderService.findAllOrders(Number(limit), Number(offset));
};

const placeOrder = async (ctx) => {
  const v = await ctx.validate({
    items: "required|array",
    userId: "required|string",
    totaalprijs: "required|decimal|min:0",
  });

  if (v.fails()) {
    ctx.status = 422;
    ctx.body = v.errors;
  }
  ctx.status = 200;
  const newOrder = await orderService.createOrder({
    ...ctx.request.body,
    date: new Date(ctx.request.body.datum),
  });
  ctx.body = newOrder;
};

module.exports = (app) => {
  const router = new Router({
    prefix: "/orders",
  });

  router.get("/", getAllOrders);
  router.post("/", placeOrder);

  app.use(router.routes()).use(router.allowedMethods());
};
