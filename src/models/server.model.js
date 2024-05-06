const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const serverSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    flag: {
      type: String,
      default: '',
    },
    file: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
serverSchema.plugin(toJSON);
serverSchema.plugin(paginate);

/**
 * @typedef Server
 */
const Server = mongoose.model('Server', serverSchema);

module.exports = Server;
