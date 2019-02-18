import {ApolloServer} from 'apollo-server-express';
import express from 'express';
import typeDefs from './types';
import resolvers from './resolvers';
export default class Server{

    app = express();
    server:ApolloServer;

    constructor(){
        this.app.disable('x-powered-by');
        this.server = new ApolloServer({
            typeDefs,
            resolvers,
            introspection: true,
            playground :true
        });
        this.server.applyMiddleware({app:this.app});
    }

    startServer(){
        this.app.listen({port:4000},()=>{
            console.log(`App is listening on port 4000 ${this.server.graphqlPath}`);
        })
    }
}

const serverObj = new Server();
serverObj.startServer();