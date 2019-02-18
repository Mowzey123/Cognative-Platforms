import User from '../models/user.model';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-core';
import {hash} from 'bcryptjs';
import Joi from 'joi';
import validation from '../helpers/validations';

require('../config/mongodb.connect');

export default {
    Query:{
        user: (root: any, id: any, context: any, info: any) => {
            if(!mongoose.Types.ObjectId.isValid(id)){
                throw new UserInputError(`${id} is not a valid user id`);
            }
            return User.findById(id);
        },
        users : (root: any, args: any, context: any, info: any) => {
          //todo auth,projection,pagination
           return  User.find({});
        }
    },
    Mutation:{
        Signup : async (root: any, args: any, context: any, info: any) => {
            await Joi.validate(args,validation.signUpvalidation);
            args.password = await hash(args.password, 12);
            return User.create(args);
        }   
    }
}