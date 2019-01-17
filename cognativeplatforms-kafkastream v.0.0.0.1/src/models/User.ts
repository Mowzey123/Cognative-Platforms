import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    username: { type: String, required: true, lowercase: true },
    createdAt: { type: Date, default: Date.now() },
});

var ErrorHanlder =  function(error, doc, next) {
    if (error.email === 'MongoError' && error.code === 11000) {
        console.log('There was a duplicate key error');
      next(new Error('There was a duplicate key error'));
    } else {
      next(error);
    }
  };
  
  UserSchema.post('save', ErrorHanlder);
//   UserSchema.post('update', ErrorHanlder);
//   UserSchema.post('findOneAndUpdate', ErrorHanlder);
//   UserSchema.post('insertMany', ErrorHanlder);
export default model('User', UserSchema);