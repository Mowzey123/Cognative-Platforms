require('../../config/mongodb.connect');
import Post from '../../models/Post';

class postRouter {
    
    constructor() {
        
    }

    async getPosts():Promise<any> {
        const result=await Post.find();
        return result;
    }

    async getAPost(id): Promise<any> {
        const result = await Post.findById(id);
        return result;
    }

    async createAPost(data): Promise<any> {
         const newPost = new Post(data);
         newPost.save().then((doc)=>{
            return {status:true,data:data};
         }).catch((err)=>{
            return {status:false,error:err};
         });   
    }

    async updatePost(data): Promise<any> {
        const { id } = data.id;
        const result = await Post.findByIdAndUpdate(id, data, {new: true});
        return result;
    }

    async deleteAPost(id): Promise<any> {
        const result = await Post.findByIdAndRemove(id);
        return result;
    }

    async getPosterPosts(data):Promise<any>{
        const result = await Post.find({poster_id:data.poster_id});
        return result;
    }

}

const postRouterobj = new postRouter();//intialize the iser oruter class
export default postRouterobj; //export Post object property router

