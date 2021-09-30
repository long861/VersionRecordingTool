'use strict';

let defaultEnvConfig = require('./default');

module.exports = {
  db: {
    //mongo库名称
    uri: process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/vrt',
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },
  log: {
    format: 'dev',
    fileLogger: {
      directoryPath: process.cwd(),
      fileName: 'app.log',
      maxsize: 2097152,
      maxFiles: 20,
      json: false
    }
  },
  app: {
    title: defaultEnvConfig.app.title + ' - Development Environment'
  },
  livereload: true,
  schedule: {
    test: {
      "corn": "0 0 */3 * * ?", // 每三小时启动一次
      "switch": true,
    }
  },
  workEnvironment: "develop"
};
