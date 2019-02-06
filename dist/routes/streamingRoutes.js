"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var express_1 = require("express");

var test_producer_1 = require("../producers/test.producer");

var streamingRoutes =
/*#__PURE__*/
function () {
  function streamingRoutes() {
    _classCallCheck(this, streamingRoutes);

    this.router = express_1.Router();
    this.routes();
  }

  _createClass(streamingRoutes, [{
    key: "createTopic",
    value: function createTopic(req, res) {
      test_producer_1.default.createTopic("cognative", "hehe");
      res.json("testing");
    }
  }, {
    key: "sendmessagetotopic",
    value: function sendmessagetotopic() {
      test_producer_1.default.sendmessagetotopic("cognative", "superfly1");
    }
  }, {
    key: "routes",
    value: function routes() {
      //this.router.get('/', this.getUsers);
      // this.router.get('/:id', this.getUser);
      this.router.post('/', this.createTopic);
      this.router.put('/:id', this.sendmessagetotopic); // this.router.delete('/:id', this.deleteUser);
    }
  }]);

  return streamingRoutes;
}();

var routes = new streamingRoutes(); //intialize the iser oruter class

exports.default = routes.router; //export user object property router
//# sourceMappingURL=streamingRoutes.js.map
