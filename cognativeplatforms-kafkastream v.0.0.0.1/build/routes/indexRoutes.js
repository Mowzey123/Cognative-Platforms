"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getIndex(req, res) {
        res.json({ "Api": " /api/posts" });
    }
    createTopic(req, res) {
        res.json({ "api": "message" });
    }
    routes() {
        this.router.get('/', this.getIndex);
        this.router.get('/createTopic', this.getIndex);
    }
}
const indexRoutes = new IndexRoutes();
indexRoutes.routes();
exports.default = indexRoutes.router;
