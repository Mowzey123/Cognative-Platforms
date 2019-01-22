import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import * as config from './config/config';

// import routes
import indexRoutes from './routes/indexRoutes';
import UserRoutes from './routes/UserRoutes';
import streamingRoutes from './routes/streamingRoutes'
//kafka stream libs
//import * as kafkaproducer from './lib/kafka/kafkaproducer';
//import * as kafkaConsumer from './lib/kafka/kafkaConsumer';

// Server Class
class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config(): void {
       
        // Settings
        this.app.set('port', config.PORT || 4000);
        // middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    //adding imported routes to middleware
    public routes(): void {
        const router: express.Router = express.Router();
        this.app.use('/', indexRoutes);
        this.app.use('/users', UserRoutes);
        this.app.use('/kafka', streamingRoutes);
    }

    //start running server on port
    public start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server is listening on port', this.app.get('port'));
            
            //kafkaproducer.maketopic("hehe","Cognative");
            //const msg = new Buffer("Message testing Assiat");
            //configuration to be changed depending on the enviroment
            //kafkaproducer.sendMessage("Cognative",1,"hehe",msg,{"host":"localhost","port":9092});
        });
    }
}

const server = new Server();
server.start();