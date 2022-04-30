import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';

import { Post } from './../entities/Post';
import { MyContext } from 'src/types';

@Resolver()
export class PostResolver {

    @Query(() => [Post])
    getPosts(
        @Ctx() context: MyContext
    ): Promise<Array<Post> | null> {
        return context.em.find(Post, {});
    }

    @Query(() => Post, { nullable: true })
    getPost(
        @Arg('pk') id: number,
        @Ctx() { em }: MyContext
    ): Promise<Post | null> {
        return em.findOne(Post, { id });
    }


    @Mutation(() => Post)
    async createPosts(
        @Arg('title') title: string,
        @Ctx() { em }: MyContext
    ): Promise<Post> {
        const post = em.create(Post, { title })
        await em.persistAndFlush(post);
        return post;
    }


    @Mutation(() => Post, { nullable: true })
    async updatePost(
        @Arg('pk') id: number,
        @Arg('title') title: string,
        @Ctx() { em }: MyContext
    ): Promise<Post | null> {
        const post = await em.findOne(Post, { id });

        if (!post) {
            return null
        }
        if (typeof title !== undefined) {
            post.title = title;
            await em.persistAndFlush(post);
        }

        return post
    }


    @Mutation(() => Boolean)
    async deletePost(
        @Arg('pk') id: number,
        @Ctx() { em }: MyContext
    ): Promise<boolean> {
        await em.nativeDelete(Post, { id })
        return true;
    }
}

