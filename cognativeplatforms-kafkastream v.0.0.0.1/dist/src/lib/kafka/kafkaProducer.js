"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var kafka_typescript_1 = require("kafka-typescript");
var rdkafka = require("node-rdkafka");
var rdkafkaProducer = rdkafka.Producer;
var rdkafkaConsumer = rdkafka.KafkaConsumer;
var producers = {};
var kafkaProducer = /** @class */ (function () {
    function kafkaProducer() {
    }
    kafkaProducer.prototype.createTopicProducer = function (topic, config) {
        return __awaiter(this, void 0, void 0, function () {
            var prod;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new kafka_typescript_1.SimpleProducer().create(rdkafkaProducer, config).connect()];
                    case 1:
                        prod = _a.sent();
                        prod.setTopic(topic);
                        producers[topic] = prod;
                        return [2 /*return*/, prod];
                }
            });
        });
    };
    kafkaProducer.prototype.createMessage = function (producer, key, topic, msg, config) {
        try {
            var prod = new kafka_typescript_1.SimpleProducer().create(rdkafkaProducer, config).connect().then(function (producer) {
                try {
                    producer.send(key, msg, topic);
                }
                catch (err) {
                    console.log(err);
                }
            }).catch(function (err) {
                console.log(err);
            });
        }
        catch (err) {
            console.log("Failed to find producer");
        }
    };
    return kafkaProducer;
}());
function maketopic(topic, producer) {
    var obj = new kafkaProducer();
    obj.createTopicProducer(producer, new kafka_typescript_1.ProducerConfig("localhost", "9092"))
        .then(function (x) {
        producers[producer].send("1", new Buffer(topic));
    }).catch(function (err) { return console.error(err); });
}
exports.default = maketopic;
//# sourceMappingURL=kafkaProducer.js.map