'use strict';

/**
 * Module dependencies.
 */
let app = require('./config/lib/app');
global.APP_ROOT = __dirname;
let server = app.start();
