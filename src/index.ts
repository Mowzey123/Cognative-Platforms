import express = require('express');
import helmet =require('helmet');
import compression = require('compression');
import cors =require('cors');
import * as config from './config/config';
import bodyParser = require('body-parser');
import {morganLogger} from './lib/morgan.logger';
// Routes
import indexRoutes from './routes/indexRoutes';



class Server {
    public app: express.Application;
//testing
    constructor() {
        this.app = express();
        this.config();
        this.routes();        
    }

    public config(): void {
        // Server Settings and middleware
        this.app.set('port', config.PORT || 4000); 
        this.app.use(bodyParser.json());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
        new morganLogger(this.app);
        
    }

    public routes(): void {
    //adding imported routes to middleware
        this.app.use('/', indexRoutes);
        
    }

    //start running server on port
    public start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server Is Listening On Port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();
export default server.app;
