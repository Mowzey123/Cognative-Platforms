import {GraphQLObjectType, GraphQLSchema} from 'graphql'
import {PostBaseMutation} from './entities/posts/mutation'
import {PostBaseQuery} from './entities/posts/query'


const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'Base Query Type',
    fields: () => ({
        post: {
            type: PostBaseQuery,
            description: PostBaseQuery.description,
            resolve: ()=>{}
        }
    })
})

const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'Base Mutation Type',
    fields: () => ({
        post: {
            type: PostBaseMutation,
            description: PostBaseMutation.description,
            resolve: () => { return {} }
        }
    })
})

export const schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});