"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const morgan_body_1 = __importDefault(require("morgan-body"));
const morgan_1 = __importDefault(require("morgan"));
class Logger {
    constructor(app) {
        this.basedir = path_1.default.join(__dirname, "../", process.env.LOG_DIR);
        this.bodyconfig =
            {
                noColors: false,
                maxBodyLength: 1000,
                prettify: true,
                logReqDateTime: true,
                dateTimeFormat: 'utc',
                stream: fs_1.default.createWriteStream(path_1.default.join(this.basedir, 'reqres.log'), { flags: 'a' })
            };
        this.config(app);
    }
    config(app) {
        //logging with morgan
        morgan_body_1.default(app, {
            prettify: true,
            skip: function (req, res) { },
            stream: fs_1.default.createWriteStream(path_1.default.join(this.basedir, 'reqres.log'), { flags: 'a' })
        });
        app.use(morgan_1.default('common', {
            skip: function (req, res) {
                return res.statusCode < 400;
            }, stream: fs_1.default.createWriteStream(path_1.default.join(this.basedir, 'access.log'), { flags: 'a' })
        }));
        app.use(morgan_1.default('commmon', {
            skip: function (req, res) {
                return res.statusCode >= 400;
            }, stream: fs_1.default.createWriteStream(path_1.default.join(this.basedir, 'error.log'), { flags: 'a' })
        }));
        //morgan
    }
}
exports.Logger = Logger;
