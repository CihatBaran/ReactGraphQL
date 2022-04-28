import { __prod__ } from "./constant";
import { Post } from "./entities/Post";
import { Options } from "@mikro-orm/core/utils/Configuration";
import path from "path";

export default {
    migrations: {
        path: path.join(__dirname, "./migrations")
    },
    entities: [Post],
    dbName: 'pgpsq',
    user: "postgres",
    password: "postgres",
    type: "postgresql",
    debug: !__prod__,
    host: 'postgres'

} as Options;