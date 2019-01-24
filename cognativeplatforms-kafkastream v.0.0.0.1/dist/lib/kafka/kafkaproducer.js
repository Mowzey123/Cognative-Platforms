"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const kafka_typescript_1 = require("kafka-typescript");
const rdkafka = require("node-rdkafka");
const rdkafkaProducer = rdkafka.Producer;
const producers = {};
class kafkaproducer {
    constructor() {
        this.config = new kafka_typescript_1.ProducerConfig("localhost", "9092");
    }
    createTopicProducer(topic) {
        return __awaiter(this, void 0, void 0, function* () {
            const prod = yield new kafka_typescript_1.SimpleProducer().create(rdkafkaProducer, this.config).connect();
            prod.setTopic(topic);
            producers[topic] = prod;
            return prod;
        });
    }
    sendMessage(producer, key, topic, msg) {
        try {
            new kafka_typescript_1.SimpleProducer().create(rdkafkaProducer, this.config).connect().then((producer) => {
                try {
                    console.log(producer.send(key, msg, topic));
                }
                catch (err) {
                    console.log(err);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        catch (err) {
            console.log("Failed to find producer");
        }
    }
}
exports.kafkaproducer = kafkaproducer;
