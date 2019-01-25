"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fbsource_1 = __importDefault(require("./../socialMediaDataSources/fbsource"));
const express_1 = require("express");
class dataSourceRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getfaceBookUser(req, res) {
        fbsource_1.default.getFBUser(req.params.id);
    }
    routes() {
        this.router.get('/:id', this.getfaceBookUser);
    }
}
const datarouter = new dataSourceRoutes();
exports.default = datarouter.router;
