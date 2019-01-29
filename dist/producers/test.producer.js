"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafkaproducer_1 = require("../lib/kafka/kafkaproducer");
class testProducer {
    constructor() {
        this.tesprod = new kafkaproducer_1.kafkaproducer();
    }
    createTopic(producer, topic) {
        this.tesprod.createTopicProducer(producer).then((producer) => {
            producer.setTopic(topic);
        }).catch((err) => {
            console.log(err);
        });
    }
    sendmessagetotopic(topic, msg) {
        this.tesprod.sendMessage("Cognative", 1, "hehe", new Buffer(msg));
    }
}
const testproducer = new testProducer();
exports.default = testproducer;
