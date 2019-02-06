"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var path = require("path");

var fs = require("fs");

var winston_1 = require("winston");

var config_1 = require("../config/config");

var data_1 = require("./data");

var winstonLogger =
/*#__PURE__*/
function () {
  function winstonLogger() {
    _classCallCheck(this, winstonLogger);

    this.logDirectory = '';
    this.logDirectory = path.join(__dirname, '../', process.env.LOG_DIR);
    fs.existsSync(this.logDirectory) || data_1.default.makeDir(this.logDirectory);
  }

  _createClass(winstonLogger, [{
    key: "logWithWinston",
    value: function logWithWinston(tolog) {
      fs.createWriteStream(path.join(this.logDirectory, 'configuredlogs.log'), {
        flags: 'a'
      });
      var logger = winston_1.createLogger({
        level: config_1.LOG_LEVEL === 'development' ? 'debug' : 'info',
        format: winston_1.format.combine(winston_1.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }), winston_1.format.printf(function (info) {
          return "".concat(info.timestamp, " ").concat(info.level, ": ").concat(info.message);
        }), winston_1.format.json()),
        transports: [new winston_1.transports.Console(), new winston_1.transports.File({
          filename: path.join(this.logDirectory, 'configuredlogs.log')
        })]
      });
      logger.info(tolog);
    }
  }]);

  return winstonLogger;
}();

var logger = new winstonLogger();
exports.default = logger;
//# sourceMappingURL=winston.logger.js.map
