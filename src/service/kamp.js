const { getLogger } = require("../core/logging");
const kampenRepository = require("../repository/kamp");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAll = async (limit, offset) => {
  debugLog("Fetching all kampen");
  const data = await kampenRepository.findAll(limit, offset);
  return {
    data: data,
    count: data.length,
    limit,
    offset,
  };
};

const getById = (id) => {
  debugLog(`Fetching kamp with id ${id}`);
  return kampenRepository.findById(id);
};

const create = ({ datum, dag, trainer, lengteDag, notities }) => {
  const newKamp = {
    datum,
    dag,
    trainer,
    lengteDag,
    notities,
  };
  debugLog(`Creating new kamp`, newKamp);
  return kampenRepository.create(newKamp);
};

const updateById = async (
  id,
  { datum, dag, trainer = null, lengteDag = null, notities = null }
) => {
  debugLog(`Updating kamp with id ${id}`, {
    datum,
    dag,
    trainer,
    lengteDag,
    notities,
  });
  return kampenRepository.updateById(id, {
    datum,
    dag,
    trainer,
    lengteDag,
    notities,
  });
};

const deleteById = async (id) => {
  debugLog(`Deleting kamp with id ${id}`);
  await kampenRepository.deleteById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
