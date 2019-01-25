import { Request, Response, NextFunction, Router } from 'express';
require('../config/mongodb.connect');
import User from '../models/User';
import {Data} from '../lib/data';

class UserRouter {
    router: Router;
    
    constructor() {
        this.router = Router();
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
        const firstname = req.body
         const newUser = new User(req.body);
         newUser.save().then((doc)=>{
             res.json({flag:true,data:doc});
         }).catch((err)=>{
             if(err.code){
                 
                const datalib = new Data();
                if(err.code=='11000'){
                    res.json({flag:false,err:"Email address is already in use"});
                    console.log(datalib.update("logs/","usercreation-err-logs",{flag:false,err:"Email address is already in use",email:req.body.email,date:new Date()}));
                }else{
                    res.json({flag:false,err:err.error.message});
                }
             }else{
                res.json({flag:false,err:err.error.message});
             }
         });   
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

