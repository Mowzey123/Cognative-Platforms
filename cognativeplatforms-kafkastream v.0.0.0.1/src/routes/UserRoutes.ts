import { Data } from './../lib/data';
import { Request, Response, NextFunction, Router } from 'express';
import User from '../models/User';
import assert from 'assert';

class UserRouter {
    router: Router;
    datalib:Data;
    constructor() {
        this.router = Router();
        this.datalib = new Data();
        this.routes();
    }

    async getUsers(req: Request, res: Response): Promise<void> {
        const users = await User.find();
        res.json(users);
    }

    async getUser(req: Request, res: Response): Promise<void> {
        const user = await User.findById(req.params.id);
        res.json(user);
    }

    async createUser(req: Request, res: Response): Promise<void> {
        // const check = this.datalib.read('users',req.body.email);
        console.log(this.datalib);
        // const newUser = new User(req.body);
        // newUser.save().then((doc)=>{
        //     console.log(doc);
        // }).catch((err)=>{
        //     console.log(err);
        // });   
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body, {new: true});
        res.json(user);
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const user = await User.findByIdAndRemove(id);
        res.json(user);
    }

    routes() {//defined routes depending on method used
        this.router.get('/', this.getUsers);
        this.router.get('/:id', this.getUser);
        this.router.post('/', this.createUser);
        this.router.put('/:id', this.updateUser);
        this.router.delete('/:id', this.deleteUser);
    }

}

const userRouter = new UserRouter();//intialize the iser oruter class
export default userRouter.router; //export user object property router

