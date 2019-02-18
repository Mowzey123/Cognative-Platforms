import {GraphQLObjectType, GraphQLString} from 'graphql'
import {PosterType, PostListType, PostType} from './type'
import postRouterobj from '../../routes/posts/postRouter';
import {ListArguments} from '../util/list';


const GetPostQuery = {
    type: PostType,
    description: PostType.description,
    args: {
        id: {
            type: GraphQLString,
            description: 'The post id'
        }
    },
    resolve: (args)=>{
        return postRouterobj.getAPost(args);
    }
}

const ListPostQuery = {
    type: PostListType,
    description: PostListType.description,
    args: { ...ListArguments },
    resolve: ()=>{
        return postRouterobj.getPosts
    }
}

const PosterQuery = {
    type: PosterType,
    description: PosterType.description,
    args:{
        poster_id:PosterType,
        description:PosterType.description
    },
    resolve: (args)=>{
        return postRouterobj.getPosterPosts(args);
    }
}

export const PostBaseQuery = new GraphQLObjectType({
    name: 'PostQuery',
    description: 'The post query',
    fields: () => ({
        get: GetPostQuery,
        list: ListPostQuery,
    })
})

