"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const test_producer_1 = __importDefault(require("../producers/test.producer"));
class streamingRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    createTopic(req, res) {
        test_producer_1.default.createTopic("cognative", "hehe");
        res.json("testing");
    }
    sendmessagetotopic() {
        test_producer_1.default.sendmessagetotopic("cognative", "superfly1");
    }
    routes() {
        //this.router.get('/', this.getUsers);
        // this.router.get('/:id', this.getUser);
        this.router.post('/', this.createTopic);
        this.router.put('/:id', this.sendmessagetotopic);
        // this.router.delete('/:id', this.deleteUser);
    }
}
const routes = new streamingRoutes(); //intialize the iser oruter class
exports.default = routes.router; //export user object property router
