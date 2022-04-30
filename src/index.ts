import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constant";
import mikConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/post";


const main = async () => {
    const orm = await MikroORM.init(mikConfig);
    await orm.getMigrator().up();
    const em = orm.em.fork({})
    
    // Express server
    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver],
            validate: false
        }),
        context: ()=> ({em: em})
    });
    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('Started server on port 4000');
    });

}

main().catch(err => {
    console.log(err)
});
