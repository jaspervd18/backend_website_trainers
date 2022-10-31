const uuid = require("uuid");
const { getKnex, tables } = require("../data");
const { getLogger } = require("../core/logging");

const findAll = ( limit, offset ) => {
  return getKnex()(tables.item)
    .select()
    .limit(limit)
    .offset(offset)
    .orderBy("name", "ASC");
};

const findById = (id) => {
  return getKnex()(tables.item).where("id", id).first();
};

const create = async ({ name, price, korting, image_url }) => {
  try {
    const id = uuid.v4();
    await getKnex()(tables.item).insert({
      id,
      name,
      price,
      korting,
      image_url,
    });
    return await findById(id);
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in create", {
      error,
    });
    throw error;
  }
};

const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.item).delete().where("id", id);
    return rowsAffected > 0;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in deleteById", { error });
    throw error;
  }
};

const giveItemDiscountById = async (id, { korting }) => {
  try {
    await getKnex()(tables.item).update({ korting }).where("id", id);
    return await findById(id);
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in giveItemDiscountById", { error });
    throw error;
  }
};

module.exports = {
  findAll,
  findById,
  create,
  deleteById,
  giveItemDiscountById,
};
