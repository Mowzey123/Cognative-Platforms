import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import * as config from './config/config';
import bodyParser from 'body-parser';
import {Logger} from './lib/logger';

// Routes
import indexRoutes from './routes/indexRoutes';
import UserRoutes from './routes/UserRoutes';
import streamingRoutes from './routes/streamingRoutes';


class Server {
    public app: express.Application;
    bodyconfig: object = {};
    logger: Logger;

    constructor() {
        this.app = express();
        this.config();
        this.routes();        
    }

    public config(): void {
        // Server Settings and middleware
        this.app.set('port', config.PORT || 4000); 
        this.app.use(bodyParser.json());
        this.logger=new Logger(this.app);
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    public routes(): void {
    //adding imported routes to middleware
        this.app.use('/', indexRoutes);
        this.app.use('/users', UserRoutes);
        this.app.use('/kafka', streamingRoutes);
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