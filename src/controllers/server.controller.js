const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { serverService } = require('../services');

const createServer = catchAsync(async (req, res) => {
  const body = {
    ...req.body,
    file: req.files.file ? req.files.file[0].filename : '',
    flag: req.files.flag ? req.files.flag[0].filename : '',
  };
  const server = await serverService.createServer(body);
  res.status(httpStatus.CREATED).send(server);
});

const getServers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'ip', 'file', 'flag']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await serverService.queryServers(filter, options);
  res.send(result);
});

const getServer = catchAsync(async (req, res) => {
  const server = await serverService.getServerId(req.params.serverId);
  if (!server) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Server not found');
  }
  res.send(server);
});

const updateServer = catchAsync(async (req, res) => {
  const body = {
    ...req.body,
    file: req.files.file.length && req.files.file[0].filename,
    flag: req.files.flag.length && req.files.flag[0].filename,
  };

  const server = await serverService.updateServerId(req.params.serverId, body);
  res.send(server);
});

const deleteServer = catchAsync(async (req, res) => {
  await serverService.deleteServerId(req.params.serverId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createServer,
  getServers,
  getServer,
  updateServer,
  deleteServer,
};
