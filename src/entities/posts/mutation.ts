import {GraphQLObjectType} from 'graphql'
import {PostType, PostInputType, PostUpdateInputType} from './type'
import postRouterobj from '../../routes/posts/postRouter';

const CreatePostQuery = {
    type: PostType,
    description: PostType.description,
    args: {
        input: {
            type: PostInputType,
            description: PostInputType.description
        }
    },
    resolve: (args)=>{
        return postRouterobj.createAPost(args)
    } // create resolver functions
}

const UpdatePostQuery = {
    type: PostType,
    description: PostType.description,
    args: {
        input: {
            type: PostUpdateInputType,
            description: PostUpdateInputType.description
        }
    },
    resolve: (args)=>{
        return postRouterobj.updatePost(args)
    }
}

export const PostBaseMutation = new GraphQLObjectType({
    name: 'PostMutation',
    description: 'The user mutation',
    fields: () => ({
        create: CreatePostQuery,
        update: UpdatePostQuery
    })
})
