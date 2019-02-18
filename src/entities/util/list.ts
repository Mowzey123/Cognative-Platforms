import {GraphQLInt} from 'graphql'

export const ListArguments = {
    page: {
        type: GraphQLInt,
        description: 'Page number'
    },
    per_page: {
        type: GraphQLInt,
        description: 'Items per page'
    }
    // TODO:
    // first
    // last
    // negative (-2) from the last
}

export interface IListArgumentsType {
    page: number
    per_page: number
}