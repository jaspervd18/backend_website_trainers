const { getLogger } = require("../core/logging");
const itemsRepository = require("../repository/item");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAll = async (limit, offset) => {
  debugLog("Fetching all items");
  const data = await itemsRepository.findAll(limit, offset);
  return {
    data: data,
    count: data.length,
    limit,
    offset,
  };
};

const getById = (id) => {
  debugLog(`Fetching item with id ${id}`);
  return itemsRepository.findById(id);
};

const create = ({ name, price, korting, imageUrl }) => {
  const newItem = { name, price, korting, image_url: imageUrl };
  debugLog(`Creating new item`, newItem);
  return itemsRepository.create(newItem);
};

const giveDiscount = async (id, { korting = 0 }) => {
  debugLog(`Updating item with id ${id}`, { korting });
  return itemsRepository.giveItemDiscountById(id, { korting });
};

const deleteById = async (id) => {
  debugLog(`Deleting item with id ${id}`);
  await itemsRepository.deleteById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  giveDiscount,
  deleteById,
};
