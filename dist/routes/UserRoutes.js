"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var express_1 = require("express");

require('../config/mongodb.connect');

var User_1 = require("../models/User");

var data_1 = require("../lib/data");

var UserRouter =
/*#__PURE__*/
function () {
  function UserRouter() {
    _classCallCheck(this, UserRouter);

    this.router = express_1.Router();
    this.routes();
  }

  _createClass(UserRouter, [{
    key: "getUsers",
    value: function getUsers(req, res) {
      return __awaiter(this, void 0, void 0,
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var users;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return User_1.default.find();

              case 2:
                users = _context.sent;
                res.json(users);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }, {
    key: "getUser",
    value: function getUser(req, res) {
      return __awaiter(this, void 0, void 0,
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var user;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return User_1.default.findById(req.params.id);

              case 2:
                user = _context2.sent;
                res.json(user);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
    }
  }, {
    key: "createUser",
    value: function createUser(req, res) {
      return __awaiter(this, void 0, void 0,
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var firstname, newUser;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                firstname = req.body;
                newUser = new User_1.default(req.body);
                newUser.save().then(function (doc) {
                  res.json({
                    flag: true,
                    data: doc
                  });
                }).catch(function (err) {
                  if (err.code) {
                    var datalib = new data_1.Data();

                    if (err.code == '11000') {
                      res.json({
                        flag: false,
                        err: "Email address is already in use"
                      });
                      console.log(datalib.update("logs/", "usercreation-err-logs", {
                        flag: false,
                        err: "Email address is already in use",
                        email: req.body.email,
                        date: new Date()
                      }));
                    } else {
                      res.json({
                        flag: false,
                        err: err.error.message
                      });
                    }
                  } else {
                    res.json({
                      flag: false,
                      err: err.error.message
                    });
                  }
                });

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
    }
  }, {
    key: "updateUser",
    value: function updateUser(req, res) {
      return __awaiter(this, void 0, void 0,
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var id, user;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = req.params.id;
                _context4.next = 3;
                return User_1.default.findByIdAndUpdate(id, req.body, {
                  new: true
                });

              case 3:
                user = _context4.sent;
                res.json(user);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
    }
  }, {
    key: "deleteUser",
    value: function deleteUser(req, res) {
      return __awaiter(this, void 0, void 0,
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var id, user;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = req.params.id;
                _context5.next = 3;
                return User_1.default.findByIdAndRemove(id);

              case 3:
                user = _context5.sent;
                res.json(user);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
    }
  }, {
    key: "routes",
    value: function routes() {
      this.router.get('/', this.getUsers);
      this.router.get('/:id', this.getUser);
      this.router.post('/', this.createUser);
      this.router.put('/:id', this.updateUser);
      this.router.delete('/:id', this.deleteUser);
    }
  }]);

  return UserRouter;
}();

var userRouter = new UserRouter(); //intialize the iser oruter class

exports.default = userRouter.router; //export user object property router
//# sourceMappingURL=UserRoutes.js.map
