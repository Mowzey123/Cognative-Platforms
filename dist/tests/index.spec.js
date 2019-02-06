"use strict";

var _this = undefined;

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

var index_1 = require("../index");

var chai_1 = require("chai");

var chaiHttp = require("chai-http");

require("mocha");

chai_1.default.use(chaiHttp);
var expect = chai_1.default.expect;
describe('defualt Server Route', function () {
  it('should return response on call', function () {
    return __awaiter(_this, void 0, void 0,
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return chai_1.default.request(index_1.default).get('/');

            case 2:
              res = _context.sent;
              expect(res.text).to.eql("/api/posts");

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));
  });
});
//# sourceMappingURL=index.spec.js.map
