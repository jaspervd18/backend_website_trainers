const uuid = require("uuid");
const { getKnex, tables } = require("../data");
const { getLogger } = require("../core/logging");

const findAll = (limit, offset) => {
  return getKnex()(tables.training)
    .select()
    .limit(limit)
    .offset(offset)
    .orderBy("datum", "DESC");
};

const findById = (id) => {
  return getKnex()(tables.training).where("id", id).first();
};

const create = async ({ datum, dag, trainer, startuur, einduur, notities }) => {
  try {
    const id = uuid.v4();
    await getKnex()(tables.training).insert({
      id,
      datum,
      dag,
      trainer,
      startuur,
      einduur,
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
    const rowsAffected = await getKnex()(tables.training)
      .delete()
      .where("id", id);
    return rowsAffected > 0;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in deleteById", { error });
    throw error;
  }
};

const updateById = async (
  id,
  { datum, dag, trainer, startuur, einduur, notities }
) => {
  try {
    await getKnex()(tables.training)
      .update({ datum, dag, trainer, startuur, einduur, notities })
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
