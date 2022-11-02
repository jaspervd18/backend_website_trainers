const { getLogger } = require("../core/logging");
const trainingenRepository = require("../repository/training");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAll = async (limit, offset) => {
  debugLog("Fetching all trainingen");
  const data = await trainingenRepository.findAll(limit, offset);
  return {
    data: data,
    count: data.length,
    limit,
    offset,
  };
};

const getById = (id) => {
  debugLog(`Fetching training with id ${id}`);
  return trainingenRepository.findById(id);
};

const create = ({ datum, dag, trainer, startuur, einduur, notities }) => {
  const newTraining = { datum, dag, trainer, startuur, einduur, notities };
  debugLog(`Creating new training`, newTraining);
  return trainingenRepository.create(newTraining);
};

const updateById = async (
  id,
  {
    datum,
    dag,
    trainer = null,
    startuur = null,
    einduur = null,
    notities = null,
  }
) => {
  debugLog(`Updating training with id ${id}`, {
    datum,
    dag,
    trainer,
    startuur,
    einduur,
    notities,
  });
  return trainingenRepository.updateById(id, {
    datum,
    dag,
    trainer,
    startuur,
    einduur,
    notities,
  });
};

const deleteById = async (id) => {
  debugLog(`Deleting training with id ${id}`);
  await trainingenRepository.deleteById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
