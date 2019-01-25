"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fbsource_1 = require("./../socialMediaDataSources/fbsource");
var express_1 = require("express");
var dataSourceRoutes = /** @class */ (function () {
    function dataSourceRoutes() {
        this.router = express_1.Router();
        this.routes();
    }
    dataSourceRoutes.prototype.getfaceBookUser = function (req, res) {
        fbsource_1.default.getFBUser(req.params.id);
    };
    dataSourceRoutes.prototype.routes = function () {
        this.router.get('/:id', this.getfaceBookUser);
    };
    return dataSourceRoutes;
}());
var datarouter = new dataSourceRoutes();
exports.default = datarouter.router;
//# sourceMappingURL=dataSourceRoutes.js.map