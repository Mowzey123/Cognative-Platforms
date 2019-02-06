"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var express_1 = require("express");

var winston_logger_1 = require("../lib/winston.logger");

var IndexRoutes =
/*#__PURE__*/
function () {
  function IndexRoutes() {
    _classCallCheck(this, IndexRoutes);

    this.router = express_1.Router();
    this.routes();
  }

  _createClass(IndexRoutes, [{
    key: "getIndex",
    value: function getIndex(req, res) {
      winston_logger_1.default.logWithWinston({
        msg: "execution at index.routes/getIndex(req, res)"
      });
      res.json("/api/posts");
      winston_logger_1.default.logWithWinston({
        msg: "execution complete index.routes/getIndex(req, res)"
      });
    }
  }, {
    key: "routes",
    value: function routes() {
      this.router.get('/', this.getIndex);
    }
  }]);

  return IndexRoutes;
}();

var indexRoutes = new IndexRoutes();
indexRoutes.routes();
exports.default = indexRoutes.router;
//# sourceMappingURL=indexRoutes.js.map
