"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fs = require("fs");

var path = require("path");

var morgan = require("morgan");

var morganBody = require("morgan-body");

var winston_1 = require("winston");

var config_1 = require("../config/config");

var morganLogger =
/*#__PURE__*/
function () {
  function morganLogger(app) {
    _classCallCheck(this, morganLogger);

    this.createMorganLogger(app);
  }

  _createClass(morganLogger, [{
    key: "createMorganLogger",
    value: function createMorganLogger(app) {
      var basedir = path.join(__dirname, "../", process.env.LOG_DIR);
      app.use(morgan('common', {
        skip: function skip(req, res) {
          return res.statusCode < 400;
        },
        stream: fs.createWriteStream(path.join(basedir, 'access.log'), {
          flags: 'a'
        })
      }));
      app.use(morgan('commmon', {
        skip: function skip(req, res) {
          return res.statusCode >= 400;
        },
        stream: fs.createWriteStream(path.join(basedir, 'error.log'), {
          flags: 'a'
        })
      }));
      morganBody(app, {
        prettify: true,
        skip: function skip(req, res) {},
        stream: fs.createWriteStream(path.join(basedir, 'reqres.log'), {
          flags: 'a'
        })
      });
    }
  }, {
    key: "logWihWinston",
    value: function logWihWinston(tolog) {
      var basedir = path.join(__dirname, "../", process.env.LOG_DIR, 'access.log');
      var logger = winston_1.createLogger({
        level: config_1.LOG_LEVEL === 'development' ? 'debug' : 'info',
        format: winston_1.format.combine(winston_1.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }), winston_1.format.printf(function (info) {
          return "".concat(info.timestamp, " ").concat(info.level, ": ").concat(info.message);
        }), winston_1.format.json()),
        transports: [new winston_1.transports.Console(), new winston_1.transports.File({
          filename: basedir
        })]
      });
      logger.info(tolog);
    }
  }]);

  return morganLogger;
}();

exports.morganLogger = morganLogger;
//# sourceMappingURL=morgan.logger.js.map
