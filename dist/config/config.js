"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
dotenv.config();
let workingpath;
switch (process.env.NODE_ENV) {
    case "test":
        workingpath = `${__dirname}../../env.test`;
        break;
    case "production":
        workingpath = `${__dirname}../../env.production`;
        break;
    default:
        workingpath = `${__dirname}../../env.development`;
}
dotenv.config({ path: workingpath });
// ensure log directory exists
var logDirectory = path_1.default.join(__dirname, '../', process.env.LOG_DIR);
fs_1.default.existsSync(logDirectory) || fs_1.default.mkdirSync(logDirectory);
exports.APP_ID = process.env.APP_ID;
exports.LOG_LEVEL = process.env.LOG_LEVEL;
exports.HOST = process.env.HOST;
exports.PORT = process.env.PORT;
exports.ZOOKEEPER_PORT = process.env.ZOOKEEPER_PORT;
exports.KAFKA_PORT = process.env.KAFKA_PORT;
exports.LOG_DIR = process.env.LOG_DIR;
