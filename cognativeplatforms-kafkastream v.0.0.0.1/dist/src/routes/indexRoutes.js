"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var IndexRoutes = /** @class */ (function () {
    function IndexRoutes() {
        this.router = express_1.Router();
        this.routes();
    }
    IndexRoutes.prototype.getIndex = function (req, res) {
        res.json({ "Api": " /api/posts" });
    };
    IndexRoutes.prototype.createTopic = function (req, res) {
        res.json({ "api": "message" });
    };
    IndexRoutes.prototype.routes = function () {
        this.router.get('/', this.getIndex);
        this.router.get('/createTopic', this.getIndex);
    };
    return IndexRoutes;
}());
var indexRoutes = new IndexRoutes();
indexRoutes.routes();
exports.default = indexRoutes.router;
//# sourceMappingURL=indexRoutes.js.map