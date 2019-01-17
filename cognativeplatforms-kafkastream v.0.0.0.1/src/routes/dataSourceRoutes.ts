import fb from './../socialMediaDataSources/fbsource';
import { Request, Response, Router } from 'express';

class dataSourceRoutes{
   
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    public getfaceBookUser(req:Request,res:Response){
            fb.getFBUser(req.params.id);
    }

    routes(): void {
        this.router.get('/:id', this.getfaceBookUser);
    }
}

const datarouter = new dataSourceRoutes();
export default datarouter.router;