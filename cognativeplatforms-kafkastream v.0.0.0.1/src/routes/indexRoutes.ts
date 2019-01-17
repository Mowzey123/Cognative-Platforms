import { Request, Response, Router } from 'express';

class IndexRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();

    }

    public getIndex(req, res): void {
        res.json({"Api":" /api/posts"});
    }

    public createTopic(req,res){
        res.json({"api":"message"});
    }

    routes(): void {
        this.router.get('/', this.getIndex);
        this.router.get('/createTopic', this.getIndex);
    }
}

const indexRoutes = new IndexRoutes();
indexRoutes.routes();

export default indexRoutes.router;