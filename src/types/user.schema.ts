import {gql} from 'apollo-server-express';

export default gql`
    
    extend type Query {
        user(id:ID!):User,
        users:[User!]!
    }

    extend type Mutation {
        Signup(username:String!,email:String!,password:String!):User
    }

    type User{
        id:ID!,
        username:String!,
        email:String!,
        password:String!,
        createdAt:String!
    }
`;