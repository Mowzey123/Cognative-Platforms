import { Request, Response, Router } from 'express';
import logger from '../lib/winston.logger';

class IndexRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getIndex(req:Request, res:Response): void {
        logger.logWithWinston({msg:"execution at index.routes/getIndex(req, res)"});
        res.json("/api/posts");
        logger.logWithWinston({msg:"execution complete index.routes/getIndex(req, res)"});
    }

    routes(): void {
        this.router.get('/', this.getIndex);
    }
}

const indexRoutes = new IndexRoutes();
indexRoutes.routes();

export default indexRoutes.router;