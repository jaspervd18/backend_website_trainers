const ordersRepository = require("../repository/order");
const { getLogger } = require("../core/logging");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const findAllOrders = async (limit = 100, offset = 0) => {
  debugLog("Fetching all orders");
  const data = await ordersRepository.findAll({ limit, offset });
  return {
    data: data,
    count: data.length,
  };
};

const createOrder = ({ items, userId, totaalprijs, adres, datum }) => {
  const newOrder = { items, user_id : userId, totaalprijs, adres, datum };
  debugLog(`Creating new order`, newOrder);
  return ordersRepository.create(newOrder);
};

module.exports = {
  findAllOrders,
  createOrder,
};
