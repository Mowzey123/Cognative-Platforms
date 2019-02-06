"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var kafka_typescript_1 = require("kafka-typescript");

var rdkafka = require("node-rdkafka");

var rdkafkaProducer = rdkafka.Producer;
var producers = {};

var kafkaproducer =
/*#__PURE__*/
function () {
  function kafkaproducer() {
    _classCallCheck(this, kafkaproducer);

    this.config = new kafka_typescript_1.ProducerConfig("localhost", "9092");
  }

  _createClass(kafkaproducer, [{
    key: "createTopicProducer",
    value: function createTopicProducer(topic) {
      return __awaiter(this, void 0, void 0,
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var prod;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return new kafka_typescript_1.SimpleProducer().create(rdkafkaProducer, this.config).connect();

              case 2:
                prod = _context.sent;
                prod.setTopic(topic);
                producers[topic] = prod;
                return _context.abrupt("return", prod);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(producer, key, topic, msg) {
      try {
        new kafka_typescript_1.SimpleProducer().create(rdkafkaProducer, this.config).connect().then(function (producer) {
          try {
            console.log(producer.send(key, msg, topic));
          } catch (err) {
            console.log(err);
          }
        }).catch(function (err) {
          console.log(err);
        });
      } catch (err) {
        console.log("Failed to find producer");
      }
    }
  }]);

  return kafkaproducer;
}();

exports.kafkaproducer = kafkaproducer;
//# sourceMappingURL=kafkaproducer.js.map
