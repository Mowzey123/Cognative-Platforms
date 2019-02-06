"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var kafka_typescript_1 = require("kafka-typescript");

var rdkafka = require("node-rdkafka");

var rdkafkaConsumer = rdkafka.KafkaConsumer;

var kafkaConsumer =
/*#__PURE__*/
function () {
  function kafkaConsumer(host, port, group) {
    _classCallCheck(this, kafkaConsumer);

    this.consumerConfig = new kafka_typescript_1.ConsumerConfig(host, port, group);
  }

  _createClass(kafkaConsumer, [{
    key: "createConsumer",
    value: function createConsumer(topics) {
      new kafka_typescript_1.SimpleConsumer().create(rdkafkaConsumer, topics, this.consumerConfig).onMessage(function (_ref) {
        var topic = _ref.topic,
            key = _ref.key,
            value = _ref.value;
        return console.log("Rec'd", topic.toString(), key.toString(), value.toString());
      }).connect();
    }
  }]);

  return kafkaConsumer;
}();

function createConsumer() {
  var consumerobj = new kafkaConsumer("localhost", "9091", "Congative-Consumer");
  consumerobj.createConsumer(["hehe"]);
}

exports.createConsumer = createConsumer;
//# sourceMappingURL=kafkaConsumer.js.map
