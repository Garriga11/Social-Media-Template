"use server";
import prisma from "@/lib/prisma";

export type Post = {
    id: string;
    email: string;
    name: string | null;
    content: string;
    createdAt: Date;
    clerkId: string;
    User: {
        name: string | null;
        clerkId: string;
        email: string;
        posts: Post[];
    };
};

export async function fetchPosts(): Promise<Post[]> {
    const posts = await prisma.post.findMany({
        include: {
            author: {
                select: {
                    firstName: true,
                    lastName: true,
                    profileImage: true,
                    clerkId: true,
                    email: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

const formattedPosts = posts.map(post => ({
    id: post.id.toString(),
    email: post.author.email,
    name: `${post.author.firstName} ${post.author.lastName}`.trim() || null,
    content: post.content || "",
    createdAt: post.createdAt,
    clerkId: post.author.clerkId,
    User: {
        name: `${post.author.firstName} ${post.author.lastName}`.trim() || null,
        clerkId: post.author.clerkId,
        email: post.author.email,
        posts: [],
    },
}));

console.log('posts fetched', formattedPosts); 
return formattedPosts;

}
