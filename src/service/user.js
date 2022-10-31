const { getLogger } = require("../core/logging");
const { generateJWT } = require("../core/jwt");
const { hashPassword, verifyPassword } = require("../core/password");
const usersRepository = require("../repository/user");
const Roles = require("../core/roles");

const debugLog = (message, meta) => {
  getLogger().debug(message, meta);
};

const makeExposedUser = ({ password_hash, ...user }) => user;

const makeLoginData = async (user) => {
  const token = await generateJWT(user);
  return {
    token,
    user: makeExposedUser(user),
  };
};

const login = async (email, password) => {
  const user = await usersRepository.findByEmail(email);

  if (!user) {
    throw new Error("The given email and password do not match");
  }

  const passwordValid = await verifyPassword(password, user.password_hash);
  if (!passwordValid) {
    throw new Error("The given email and password do not match");
  }

  return await makeLoginData(user);
};

const register = async ({ name, email, password, roles }) => {
  debugLog("Creating a new user", { name });
  const passwordHash = await hashPassword(password);
  const user =  await usersRepository.create({
    name,
    email,
    passwordHash,
    roles,
  });
  return await makeLoginData(user);
};

const getAll = async (limit = 100, offset = 0) => {
  debugLog("Fetcing all users", { limit, offset });
  const data = await usersRepository.findAll({ limit, offset });
  const count = await usersRepository.findCount();
  return {
    data,
    count,
    limit,
    offset,
  };
};

const getById = async (id) => {
  debugLog("Fetcing user with id ", id);
  const user = await usersRepository.findById(id);

  if (!user) {
    throw new Error(`No user whit id ${id} exists`);
  }

  return user;
};

const updateById = (id, { name }) => {
  return usersRepository.updateById(id, { name });
};

const deleteById = async (id) => {
  const deleted = await usersRepository.deleteById(id);

  if (!deleted) {
    throw new Error(`No user with id ${id} exists`);
  }
};

module.exports = {
  login,
  register,
  getAll,
  getById,
  deleteById,
  updateById,
};
