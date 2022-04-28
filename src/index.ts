import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constant";
import { Post } from "./entities/Post";
import mikConfig from "./mikro-orm.config";


const main = async () => {
    const orm = await MikroORM.init(mikConfig);
    await orm.getMigrator().up();

    const em = orm.em.fork({})
    // const post = em.create(Post, { title: 'Cihat Baran post' });
    // await em.persistAndFlush(post);

    const posts = await em.find(Post, {});
    console.log(posts)

}

main().catch(err => {
    console.log(err)
});