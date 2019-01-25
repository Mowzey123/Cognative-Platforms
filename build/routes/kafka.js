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
class kafka {
    constructor() {
    }
    createTopicProducer(topic, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const prod = yield new kafka_typescript_1.SimpleProducer().create(rdkafkaProducer, config).connect();
            prod.setTopic(topic);
            producers[topic] = prod;
            return prod;
        });
    }
}
function maketopic(topic) {
    const obj = new kafka();
    obj.createTopicProducer("Cognative", new kafka_typescript_1.ProducerConfig("localhost", "9092"))
        .then(x => {
        producers["Cognative"].send("1", new Buffer(topic));
    }).catch(err => console.error(err));
}
exports.default = maketopic;
