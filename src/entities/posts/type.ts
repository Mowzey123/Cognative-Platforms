import {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLInputObjectType
} from 'graphql'

export interface postType {
    id: string
}

export interface PosterType {
    poster_id: number
}

export interface postInputType {
    heading: string
    body: string
}

export interface postUpdateInputType {
    id: string
    heading?: string
    body?: string
}

export const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'post graph type',
    fields: () => ({
        id: {
            type: GraphQLString,
            description: 'The post id.'
        },
        posterid: {
            type: GraphQLString,
            description: 'The user id.'
        },
        heading: {
            type: GraphQLString,
            description: 'Post heading.'
        },
        body: {
            type: GraphQLString,
            description: 'Post body.'
        }
    })
})

export const PosterType = new GraphQLObjectType({
    name: 'Poster type',
    description: 'posting id  type',
    fields: () => ({
        poster_id: {
            type: GraphQLString,
            description: 'The user id.'
        }
    })
})

export const PostListType = new GraphQLObjectType({
    name: 'PostList',
    description: PostType.description,
    fields: () => ({
        count: {
            type: GraphQLInt,
            description: 'Total number of Posts'
        },
        data: {
            type: new GraphQLList(PostType),
            description: PostType.description,
            resolve: (dataObject) => {
                return dataObject.users
            }
        }
    })
})

export const PostInputType = new GraphQLInputObjectType({
    name: 'PostInputType',
    description: 'Input types for a post',
    fields: () => ({
        poster_id:{
            type:GraphQLInt,
            description:'user posting'
        },
        body: {
            type: GraphQLString,
            description: 'The post body.'
        },
        heading: {
            type: GraphQLString,
            description: 'Post heading.'
        }
    })
})

export const PostUpdateInputType = new GraphQLInputObjectType({
    name: 'PostUpdateInputType',
    description: 'Input types to update a post',
    fields: () => ({
        id: {
            type: GraphQLString,
            description: 'The post id.'
        },
        ...PostInputType.getFields(),
        body: {
            type: GraphQLString,
            description: 'The post body.'
        },
        heading:{
            type: GraphQLString,
            description: 'The post heading.'
        }
    })
})
