"use strict";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            type Query {\n                hello: String\n            }\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var express = require("express");

var helmet = require("helmet");

var compression = require("compression");

var cors = require("cors");

var _config = require("./config/config");

var bodyParser = require("body-parser");

var morgan_logger_1 = require("./lib/morgan.logger");

var module_1 = require(); // Routes


var indexRoutes_1 = require("./routes/indexRoutes");

var UserRoutes_1 = require("./routes/users/UserRoutes");

var streamingRoutes_1 = require("./routes/streamingRoutes");

var Server =
/*#__PURE__*/
function () {
  //testing
  function Server() {
    _classCallCheck(this, Server);

    // Construct a schema, using GraphQL schema language
    this.typeDefs = module_1.gql(_templateObject()); // Provide resolver functions for your schema fields

    this.resolvers = {
      Query: {
        hello: function hello() {
          return 'Hello world!';
        }
      }
    };
    this.app = express();
    this.config();
    this.routes();
  }

  _createClass(Server, [{
    key: "config",
    value: function config() {
      // Server Settings and middleware
      this.app.set('port', _config.PORT || 4000);
      this.app.use(bodyParser.json());
      this.app.use(express.json());
      this.app.use(express.urlencoded({
        extended: false
      }));
      this.app.use(helmet());
      this.app.use(compression());
      this.app.use(cors());
      this.server = new module_1.ApolloServer({
        typeDefs: this.typeDefs,
        resolvers: this.resolvers
      });
      new morgan_logger_1.morganLogger(this.app);
      this.server.applyMiddleware({
        app: this.app
      });
    }
  }, {
    key: "routes",
    value: function routes() {
      //adding imported routes to middleware
      this.app.use('/', indexRoutes_1.default);
      this.app.use('/users', UserRoutes_1.default);
      this.app.use('/kafka', streamingRoutes_1.default);
    } //start running server on port

  }, {
    key: "start",
    value: function start() {
      var _this = this;

      this.app.listen(this.app.get('port'), function () {
        console.log("Server Is Listening On Port ".concat(_this.server.graphqlPath), _this.app.get('port'));
      });
    }
  }]);

  return Server;
}();

var server = new Server();
server.start();
exports.default = server.app;
//# sourceMappingURL=index.js.map
