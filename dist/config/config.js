"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var dotenv = require("dotenv");

var fs = require('fs');

var path = require('path');

var data_1 = require("../lib/data");

dotenv.config();
var workingpath;

switch (process.env.NODE_ENV) {
  case "test":
    workingpath = "".concat(__dirname, "../../env.test");
    break;

  case "production":
    workingpath = "".concat(__dirname, "../../env.production");
    break;

  default:
    workingpath = "".concat(__dirname, "../../env.development");
}

dotenv.config({
  path: workingpath
}); // ensure log directory exists

var logDirectory = path.join(__dirname, '../', process.env.LOG_DIR);
fs.existsSync(logDirectory) || data_1.default.makeDir(logDirectory);
exports.APP_ID = process.env.APP_ID;
exports.LOG_LEVEL = process.env.LOG_LEVEL;
exports.HOST = process.env.HOST;
exports.PORT = process.env.PORT;
exports.ZOOKEEPER_PORT = process.env.ZOOKEEPER_PORT;
exports.KAFKA_PORT = process.env.KAFKA_PORT;
exports.LOG_DIR = process.env.LOG_DIR;
//# sourceMappingURL=config.js.map
