import { __prod__ } from "./constant";
import { Post } from "./entities/Post";
import { Options } from "@mikro-orm/core/utils/Configuration";
import path from "path";

export default {
    migrations: {
        path: path.join(__dirname, "./migrations")
    },
    entities: [Post],
    dbName: 'react',
    user: "postgres",
    password: "Cbaran2011",
    host: 'localhost',
    type: "postgresql",
    port: 5432,
    debug: !__prod__

} as Options;