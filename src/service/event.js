const { getLogger } = require("../core/logging");
const eventsRepository = require("../repository/event");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAll = async (limit, offset) => {
  debugLog("Fetching all events");
  const data = await eventsRepository.findAll(limit, offset);
  return {
    data: data,
    count: data.length,
    limit,
    offset,
  };
};

const getById = (id) => {
  debugLog(`Fetching event with id ${id}`);
  return eventsRepository.findById(id);
};

const create = ({ soort, trainer, datum, startuur, einduur, notities }) => {
  const newEvent = { soort, trainer, datum, startuur, einduur, notities };
  debugLog(`Creating new event`, newEvent);
  return eventsRepository.create(newEvent);
};

const updateById = async (
  id,
  { soort, trainer = "", datum, startuur = "", einduur = "", notities = "" }
) => {
  debugLog(`Updating event with id ${id}`, {
    soort,
    trainer,
    datum,
    startuur,
    einduur,
    notities,
  });
  return eventsRepository.updateById(id, {
    soort,
    trainer,
    datum,
    startuur,
    einduur,
    notities,
  });
};

const deleteById = async (id) => {
  debugLog(`Deleting event with id ${id}`);
  await eventsRepository.deleteById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
