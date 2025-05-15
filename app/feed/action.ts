"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";



export async function fetchPosts() {
    const posts = await prisma.posts.findMany({
        include: {
            user: true, // Include user details
        },
        orderBy: {
            createdAt: "desc", // Order by newest first
        },
    });

    return posts;
}

 
export async function deletePost(postId: string) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized: User is not signed in.");
    }


    const post = await prisma.posts.findUnique({
        where: { id: postId },
    });

    if (!post) {
        throw new Error("Post not found.");
    }

    if (post.userId !== userId) {
        throw new Error("Not allowed: You can only delete your own posts.");
    }

    // Delete the post
    await prisma.posts.delete({
        where: { id: postId },
    });

    return { message: "Post deleted successfully." };
}