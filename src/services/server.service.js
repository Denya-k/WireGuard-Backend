const httpStatus = require('http-status');
const { Server } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a server
 * @param {Object} serverBody
 * @returns {Promise<Server>}
 */
const createServer = async (serverBody) => {
  return Server.create(serverBody);
};

/**
 * Query for servers
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryServers = async (filter, options) => {
  const servers = await Server.paginate(filter, options);
  return servers;
};

/**
 * Get server by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getServerId = async (id) => {
  return Server.findById(id);
};

/**
 * Update server by id
 * @param {ObjectId} serverId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateServerId = async (serverId, updateBody) => {
  const server = await getServerId(serverId);
  if (!server) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Server not found');
  }

  Object.assign(server, updateBody);
  await server.save();
  return server;
};

/**
 * Delete server by id
 * @param {ObjectId} serverId
 * @returns {Promise<User>}
 */
const deleteServerId = async (serverId) => {
  const server = await getServerId(serverId);
  if (!server) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await server.remove();
  return server;
};

module.exports = {
  createServer,
  queryServers,
  getServerId,
  updateServerId,
  deleteServerId,
};
