import { Request, Response, NextFunction, Router } from 'express';
import  producer from '../producers/test.producer';

class streamingRoutes {
    router: Router;
    
    constructor() {
        this.router = Router();
        this.routes();        
    }

    createTopic(req:Request,res:Response){
        producer.createTopic("cognative","hehe");
        res.json("testing");
    }

    sendmessagetotopic(){
        producer.sendmessagetotopic("cognative","superfly1");
    }

    routes() {//defined routes depending on method used
        //this.router.get('/', this.getUsers);
        // this.router.get('/:id', this.getUser);
        this.router.post('/', this.createTopic);
        this.router.put('/:id', this.sendmessagetotopic);
        // this.router.delete('/:id', this.deleteUser);
    }

}

const routes = new streamingRoutes();//intialize the iser oruter class
export default routes.router; //export user object property router

