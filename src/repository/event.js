const uuid = require("uuid");
const { getKnex, tables } = require("../data");
const { getLogger } = require("../core/logging");

const findAll = (limit, offset) => {
  return getKnex()(tables.event)
    .select()
    .limit(limit)
    .offset(offset)
    .orderBy("trainer", "ASC");
};

const findById = (id) => {
  return getKnex()(tables.event).where("id", id).first();
};

const create = async ({
  soort,
  trainer,
  datum,
  startuur,
  einduur,
  notities,
}) => {
  try {
    const id = uuid.v4();
    await getKnex()(tables.event).insert({
      id,
      soort,
      trainer,
      datum,
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
    const rowsAffected = await getKnex()(tables.event).delete().where("id", id);
    return rowsAffected > 0;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in deleteById", { error });
    throw error;
  }
};

const updateById = async (
  id,
  { soort, trainer, datum, startuur, einduur, notities }
) => {
  try {
    await getKnex()(tables.event)
      .update({ soort, trainer, datum, startuur, einduur, notities })
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
