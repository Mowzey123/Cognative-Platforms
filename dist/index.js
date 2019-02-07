"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var express = require("express");

var helmet = require("helmet");

var compression = require("compression");

var cors = require("cors");

var _config = require("./config/config");

var bodyParser = require("body-parser");

var morgan_logger_1 = require("./lib/morgan.logger"); // Routes


var indexRoutes_1 = require("./routes/indexRoutes");

var Server =
/*#__PURE__*/
function () {
  //testing
  function Server() {
    _classCallCheck(this, Server);

    this.app = express();
    this.config();
    this.routes();
  }

  _createClass(Server, [{
    key: "config",
    value: function config() {
      // Server Settings and middleware
      this.app.set('port', _config.PORT || 4000);
      this.app.use(bodyParser.json());
      this.app.use(express.json());
      this.app.use(express.urlencoded({
        extended: false
      }));
      this.app.use(helmet());
      this.app.use(compression());
      this.app.use(cors());
      new morgan_logger_1.morganLogger(this.app);
    }
  }, {
    key: "routes",
    value: function routes() {
      //adding imported routes to middleware
      this.app.use('/', indexRoutes_1.default);
    } //start running server on port

  }, {
    key: "start",
    value: function start() {
      var _this = this;

      this.app.listen(this.app.get('port'), function () {
        console.log('Server Is Listening On Port', _this.app.get('port'));
      });
    }
  }]);

  return Server;
}();

var server = new Server();
server.start();
exports.default = server.app;
//# sourceMappingURL=index.js.map
