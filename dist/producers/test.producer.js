"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var kafkaproducer_1 = require("../lib/kafka/kafkaproducer");

var testProducer =
/*#__PURE__*/
function () {
  function testProducer() {
    _classCallCheck(this, testProducer);

    this.tesprod = new kafkaproducer_1.kafkaproducer();
  }

  _createClass(testProducer, [{
    key: "createTopic",
    value: function createTopic(producer, topic) {
      this.tesprod.createTopicProducer(producer).then(function (producer) {
        producer.setTopic(topic);
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: "sendmessagetotopic",
    value: function sendmessagetotopic(topic, msg) {
      this.tesprod.sendMessage("Cognative", 1, "hehe", new Buffer(msg));
    }
  }]);

  return testProducer;
}();

var testproducer = new testProducer();
exports.default = testproducer;
//# sourceMappingURL=test.producer.js.map
