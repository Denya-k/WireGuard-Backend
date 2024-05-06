const Joi = require('joi');
const { objectId, checkIp } = require('./custom.validation');

const createServer = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    ip: Joi.string().required().custom(checkIp),
    flag: Joi.alternatives().try(
      Joi.allow(null),
      Joi.object()
        .allow(null)
        .when(Joi.ref('.'), {
          then: Joi.object({
            filename: Joi.string().required(),
            path: Joi.string().required(),
            headers: Joi.object({
              'content-disposition': Joi.string().required(),
              'content-type': Joi.string()
                .regex(/^image\/(jpeg|png|gif|jpg)$/)
                .required(),
            }).required(),
            bytes: Joi.number().required(),
          }),
          otherwise: Joi.any().forbidden(),
        })
    ),
    file: Joi.alternatives().try(
      Joi.allow(null),
      Joi.object()
        .allow(null)
        .when(Joi.ref('.'), {
          then: Joi.object({
            filename: Joi.string().required(),
            path: Joi.string().required(),
            headers: Joi.object({
              'content-disposition': Joi.string().required(),
              'content-type': Joi.string().valid('conf').required(),
            }).required(),
            bytes: Joi.number().required(),
          }),
          otherwise: Joi.any().forbidden(),
        })
    ),
  }),
};

const getServers = {
  query: Joi.object().keys({
    name: Joi.string(),
    ip: Joi.string().custom(checkIp),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getServer = {
  params: Joi.object().keys({
    serverId: Joi.string().custom(objectId),
  }),
};

const updateServer = {
  params: Joi.object().keys({
    serverId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      ip: Joi.string().custom(checkIp),
      flag: Joi.alternatives().try(
        Joi.allow(null),
        Joi.object()
          .allow(null)
          .when(Joi.ref('.'), {
            then: Joi.object({
              filename: Joi.string().required(),
              path: Joi.string().required(),
              headers: Joi.object({
                'content-disposition': Joi.string().required(),
                'content-type': Joi.string()
                  .regex(/^image\/(jpeg|png|gif|jpg)$/)
                  .required(),
              }).required(),
              bytes: Joi.number().required(),
            }),
            otherwise: Joi.any().forbidden(),
          })
      ),
      file: Joi.alternatives().try(
        Joi.allow(null),
        Joi.object()
          .allow(null)
          .when(Joi.ref('.'), {
            then: Joi.object({
              filename: Joi.string().required(),
              path: Joi.string().required(),
              headers: Joi.object({
                'content-disposition': Joi.string().required(),
                'content-type': Joi.string().valid('conf').required(),
              }).required(),
              bytes: Joi.number().required(),
            }),
            otherwise: Joi.any().forbidden(),
          })
      ),
    })
    .min(1),
};

const deleteServer = {
  params: Joi.object().keys({
    serverId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createServer,
  getServers,
  getServer,
  updateServer,
  deleteServer,
};
