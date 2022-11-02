const uuid = require("uuid");
const { getKnex, tables } = require("../data");
const { getLogger } = require("../core/logging");

const findAll = (limit, offset) => {
  return getKnex()(tables.wedstrijd)
    .select()
    .limit(limit)
    .offset(offset)
    .orderBy("datum", "DESC");
};

const findById = (id) => {
  return getKnex()(tables.wedstrijd).where("id", id).first();
};

const create = async ({
  datum,
  dag,
  naam,
  locatie,
  trainer,
  functie,
  notities,
}) => {
  try {
    const id = uuid.v4();
    await getKnex()(tables.wedstrijd).insert({
      id,
      datum,
      dag,
      naam,
      locatie,
      trainer,
      functie,
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
    const rowsAffected = await getKnex()(tables.wedstrijd)
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
  { datum, dag, naam, locatie, trainer, functie, notities }
) => {
  try {
    await getKnex()(tables.wedstrijd)
      .update({ datum, dag, naam, locatie, trainer, functie, notities })
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
