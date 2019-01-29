"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
require('../config/mongodb.connect');
const User_1 = __importDefault(require("../models/User"));
const data_1 = require("../lib/data");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.default.find();
            res.json(users);
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findById(req.params.id);
            res.json(user);
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const firstname = req.body;
            const newUser = new User_1.default(req.body);
            newUser.save().then((doc) => {
                res.json({ flag: true, data: doc });
            }).catch((err) => {
                if (err.code) {
                    const datalib = new data_1.Data();
                    if (err.code == '11000') {
                        res.json({ flag: false, err: "Email address is already in use" });
                        console.log(datalib.update("logs/", "usercreation-err-logs", { flag: false, err: "Email address is already in use", email: req.body.email, date: new Date() }));
                    }
                    else {
                        res.json({ flag: false, err: err.error.message });
                    }
                }
                else {
                    res.json({ flag: false, err: err.error.message });
                }
            });
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield User_1.default.findByIdAndUpdate(id, req.body, { new: true });
            res.json(user);
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield User_1.default.findByIdAndRemove(id);
            res.json(user);
        });
    }
    routes() {
        this.router.get('/', this.getUsers);
        this.router.get('/:id', this.getUser);
        this.router.post('/', this.createUser);
        this.router.put('/:id', this.updateUser);
        this.router.delete('/:id', this.deleteUser);
    }
}
const userRouter = new UserRouter(); //intialize the iser oruter class
exports.default = userRouter.router; //export user object property router
