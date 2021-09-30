'use strict';

/**
 * Module dependencies.
 */
let _ = require('lodash'),
  config = require('../config'),
  chalk = require('chalk'),
  path = require('path'),
  mongoose = require('mongoose');

// Load the mongoose models
module.exports.loadModels = function (callback) {
  // Globbing model files
  config.files.server.models.forEach(function (modelPath) {
    require(path.resolve(modelPath));
  });

  if (callback) callback();
};

// Initialize Mongoose
module.exports.connect = function (callback) {
  mongoose.Promise = config.db.promise;

  let options = _.merge(config.db.options || {});

  mongoose
    .connect(config.db.uri, options)
    .then(function (connection) {
      // Enabling mongoose debug mode if required
      mongoose.set('debug', config.db.debug);
      mongoose.set('useCreateIndex', true);

      // Call callback FN
      if (callback) callback(connection);
    })
    .catch(function (err) {
      console.error(chalk.red('Could not connect to MongoDB!'));
      console.log(err);
    });

};

module.exports.disconnect = function (cb) {
  mongoose.connection.db
    .close(function (err) {
      console.info(chalk.yellow('Disconnected from MongoDB.'));
      return cb(err);
    });
};
