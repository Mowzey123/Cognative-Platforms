"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafka_typescript_1 = require("kafka-typescript");
const rdkafka = require("node-rdkafka");
const rdkafkaConsumer = rdkafka.KafkaConsumer;
class kafkaConsumer {
    constructor(host, port, group) {
        this.consumerConfig = new kafka_typescript_1.ConsumerConfig(host, port, group);
    }
    createConsumer(topics) {
        new kafka_typescript_1.SimpleConsumer().create(rdkafkaConsumer, topics, this.consumerConfig)
            .onMessage(({ topic, key, value }) => console.log("Rec'd", topic.toString(), key.toString(), value.toString()))
            .connect();
    }
}
function createConsumer() {
    const consumerobj = new kafkaConsumer("localhost", "9091", "Congative-Consumer");
    consumerobj.createConsumer(["hehe"]);
}
exports.createConsumer = createConsumer;
