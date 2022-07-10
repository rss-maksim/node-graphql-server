import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import dotenv from 'dotenv';

import typeDefs from './graphql/schema';
import {resolvers} from './resolvers';

dotenv.config();

const port = Number(process.env.PORT) || 8080;

startServer()
    .then((server) => {
        const app = express();

        server.applyMiddleware({
            app,
            cors: true,
        });

        app.listen(port,() => {
            console.log(`GraphQL endpoint and playground accessible at http://localhost:${port}${server.graphqlPath}`);
        });
    });

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: 'bounded',
        context: ({ req }) => {
            const token = req.headers.authorization || '';
            return { token };
        },
    });

    await server.start();

    return server;
}
