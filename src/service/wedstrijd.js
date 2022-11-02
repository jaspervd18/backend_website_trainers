const { getLogger } = require("../core/logging");
const wedstrijdenRepository = require("../repository/wedstrijd");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAll = async (limit, offset) => {
  debugLog("Fetching all wedstrijden");
  const data = await wedstrijdenRepository.findAll(limit, offset);
  return {
    data: data,
    count: data.length,
    limit,
    offset,
  };
};

const getById = (id) => {
  debugLog(`Fetching wedstrijd with id ${id}`);
  return wedstrijdenRepository.findById(id);
};

const create = ({ datum, dag, naam, locatie, trainer, functie, notities }) => {
  const newWedstrijd = {
    datum,
    dag,
    naam,
    locatie,
    trainer,
    functie,
    notities,
  };
  debugLog(`Creating new wedstrijd`, newWedstrijd);
  return wedstrijdenRepository.create(newWedstrijd);
};

const updateById = async (
  id,
  { datum, dag, naam, locatie, trainer = null, functie = null, notities = null }
) => {
  debugLog(`Updating wedstrijd with id ${id}`, {
    datum,
    dag,
    naam,
    locatie,
    trainer,
    functie,
    notities,
  });
  return wedstrijdenRepository.updateById(id, {
    datum,
    dag,
    naam,
    locatie,
    trainer,
    functie,
    notities,
  });
};

const deleteById = async (id) => {
  debugLog(`Deleting wedstrijd with id ${id}`);
  await wedstrijdenRepository.deleteById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
