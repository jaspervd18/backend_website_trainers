const uuid = require("uuid");
const { getKnex, tables } = require("../data");
const { getLogger } = require("../core/logging");

const findAll = ({ limit, offset }) => {
  return getKnex()(tables.order)
    .select()
    .limit(limit)
    .offset(offset)
    .orderBy("datum", "DESC");
};

const findById = (id) => {
  return getKnex()(tables.order).where("id", id).first();
};

const create = async ({ items, user_id, totaalprijs, adres, datum }) => {
  try {
    const id = uuid.v4();
    await getKnex()(tables.order).insert({
      id,
      items: JSON.stringify(items),
      user_id,
      totaalprijs,
      adres: JSON.stringify(adres),
      datum,
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

module.exports = {
  findAll,
  create,
};
