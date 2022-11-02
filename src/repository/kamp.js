const uuid = require("uuid");
const { getKnex, tables } = require("../data");
const { getLogger } = require("../core/logging");

const findAll = (limit, offset) => {
  return getKnex()(tables.kamp)
    .select()
    .limit(limit)
    .offset(offset)
    .orderBy("datum", "DESC");
};

const findById = (id) => {
  return getKnex()(tables.kamp).where("id", id).first();
};

const create = async ({ datum, dag, trainer, lengteDag, notities }) => {
  try {
    const id = uuid.v4();
    await getKnex()(tables.kamp).insert({
      id,
      datum,
      dag,
      trainer,
      lengteDag,
      notities,
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
    const rowsAffected = await getKnex()(tables.kamp).delete().where("id", id);
    return rowsAffected > 0;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in deleteById", { error });
    throw error;
  }
};

const updateById = async (id, { datum, dag, trainer, lengteDag, notities }) => {
  try {
    await getKnex()(tables.kamp)
      .update({ datum, dag, trainer, lengteDag, notities })
      .where("id", id);
    return await findById(id);
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in updateById", { error });
    throw error;
  }
};

module.exports = {
  findAll,
  findById,
  create,
  deleteById,
  updateById,
};
