import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constant";
import mikConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";


const main = async () => {
    const orm = await MikroORM.init(mikConfig);
    await orm.getMigrator().up();
    // const em = orm.em.fork({})


    // Express server
    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver],
            validate: false
        }),
    });
    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    app.listen(3000, () => {
        console.log('Started server on port 3000');
    });

}

main().catch(err => {
    console.log(err)
});