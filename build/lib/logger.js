"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const morgan_body_1 = __importDefault(require("morgan-body"));
const winston_1 = require("winston");
const config_1 = require("../config/config");
class Logger {
    constructor(app) {
        this.createMogganLogger(app);
    }
    createMogganLogger(app) {
        const basedir = path_1.default.join(__dirname, "../", process.env.LOG_DIR);
        app.use(morgan_1.default('common', {
            skip: function (req, res) {
                return res.statusCode < 400;
            }, stream: fs_1.default.createWriteStream(path_1.default.join(basedir, 'access.log'), { flags: 'a' })
        }));
        app.use(morgan_1.default('commmon', {
            skip: function (req, res) {
                return res.statusCode >= 400;
            }, stream: fs_1.default.createWriteStream(path_1.default.join(basedir, 'error.log'), { flags: 'a' })
        }));
        morgan_body_1.default(app, {
            prettify: true,
            skip: function (req, res) {
            },
            stream: fs_1.default.createWriteStream(path_1.default.join(basedir, 'reqres.log'), { flags: 'a' })
        });
    }
    logWihWinston(tolog) {
        const basedir = path_1.default.join(__dirname, "../", process.env.LOG_DIR, 'access.log');
        const logger = winston_1.createLogger({
            level: config_1.LOG_LEVEL === 'development' ? 'debug' : 'info',
            format: winston_1.format.combine(winston_1.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }), winston_1.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`), winston_1.format.json()),
            transports: [
                new winston_1.transports.Console(),
                new winston_1.transports.File({ filename: basedir })
            ]
        });
        logger.info(tolog);
    }
}
exports.Logger = Logger;
