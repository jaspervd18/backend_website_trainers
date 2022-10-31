const uuid = require("uuid");
const { getKnex, tables } = require("../data");
const { getLogger } = require("../core/logging");

const findAll = ({ limit, offset }) => {
  return getKnex()(tables.user)
    .select()
    .limit(limit)
    .offset(offset)
    .orderBy("name", "ASC");
};

const create = async ({ name, email, passwordHash, roles }) => {
  try {
    const id = uuid.v4();
    await getKnex()(tables.user).insert({
      id,
      name,
      email,
      password_hash: passwordHash,
      roles: JSON.stringify(roles),
    });
    return await findById(id);
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in create", { error });
    throw error;
  }
};

const findById = (id) => {
  return getKnex()(tables.user).where("id", id).first();
};

const findByEmail = (email) => {
  return getKnex()(tables.user).where("email", email).first();
};

const updateById = async (id, { name }) => {
  try {
    await getKnex()(tables.user).update({ name }).where("id", id);
  } catch (error) {
    const logger = getLogger();

    logger.debug("Error in updateById", { error });
    throw error;
  }
};

const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.user).delete().where("id", id);
    return rowsAffected > 0;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in deleteById", { error });
    throw error;
  }
};

const findCount = async () => {
  const [count] = await getKnex()(tables.user).count();
  return count["count(*)"];
};

module.exports = {
  findAll,
  create,
  findById,
  updateById,
  deleteById,
  findCount,
  findByEmail,
};
