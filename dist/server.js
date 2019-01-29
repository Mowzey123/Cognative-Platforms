"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const config = __importStar(require("./config/config"));
const body_parser_1 = __importDefault(require("body-parser"));
const logger_1 = require("./lib/logger");
// Routes
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const streamingRoutes_1 = __importDefault(require("./routes/streamingRoutes"));
class Server {
    constructor() {
        this.bodyconfig = {};
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        // Server Settings and middleware
        this.app.set('port', config.PORT || 4000);
        this.app.use(body_parser_1.default.json());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(helmet_1.default());
        this.app.use(compression_1.default());
        this.app.use(cors_1.default());
        this.logger = new logger_1.Logger(this.app);
    }
    routes() {
        //adding imported routes to middleware
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/users', UserRoutes_1.default);
        this.app.use('/kafka', streamingRoutes_1.default);
    }
    //start running server on port
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server Is Listening On Port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
