"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kafka_typescript_1 = require("kafka-typescript");
var rdkafka = require("node-rdkafka");
var rdkafkaConsumer = rdkafka.KafkaConsumer;
var kafkaConsumer = /** @class */ (function () {
    function kafkaConsumer(host, port, group) {
        this.consumerConfig = new kafka_typescript_1.ConsumerConfig(host, port, group);
    }
    kafkaConsumer.prototype.createConsumer = function (topics) {
        new kafka_typescript_1.SimpleConsumer().create(rdkafkaConsumer, topics, this.consumerConfig)
            .onMessage(function (_a) {
            var topic = _a.topic, key = _a.key, value = _a.value;
            return console.log("Rec'd", topic.toString(), key.toString(), value.toString());
        })
            .connect();
    };
    return kafkaConsumer;
}());
//# sourceMappingURL=kafkaConsumer.js.map