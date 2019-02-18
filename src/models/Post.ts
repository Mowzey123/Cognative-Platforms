import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
    poster_id: { type: Intl, required: true },
    heading: { type: String, required: true },
    body: { type: String, required: true, lowercase: true },
    createdAt: { type: Date, default: Date.now() },
});

var ErrorHanlder =  function(error, doc, next) {
    if (error){
        console.log(error);
    } else {
        next(error);
    }
  };
  
  PostSchema.post('save', ErrorHanlder);
  PostSchema.post('update', ErrorHanlder);
  PostSchema.post('findOneAndUpdate', ErrorHanlder);
export default model('Post', PostSchema);