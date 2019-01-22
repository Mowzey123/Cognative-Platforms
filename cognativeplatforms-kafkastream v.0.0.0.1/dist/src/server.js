"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var morgan_1 = require("morgan");
var helmet_1 = require("helmet");
var compression_1 = require("compression");
var cors_1 = require("cors");
// import routes
var indexRoutes_1 = require("./routes/indexRoutes");
var UserRoutes_1 = require("./routes/UserRoutes");
var kafkaProducer_1 = require("./lib/kafka/kafkaProducer");
// Server Class
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        var MONGO_URI = 'mongodb://localhost/restapits';
        mongoose_1.default.set('useFindAndModify', false);
        mongoose_1.default.connect(MONGO_URI || process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true
        });
        // Settings
        this.app.set('port', process.env.PORT || 4000);
        // middlewares
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(helmet_1.default());
        this.app.use(compression_1.default());
        this.app.use(cors_1.default());
    };
    Server.prototype.routes = function () {
        var router = express_1.default.Router();
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/users', UserRoutes_1.default);
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get('port'), function () {
            console.log('Server is listenning on port', _this.app.get('port'));
            kafkaProducer_1.default("hehe", "Cognative");
        });
    };
    return Server;
}());
var server = new Server();
server.start();
//# sourceMappingURL=server.js.map