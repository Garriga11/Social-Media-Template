import prisma from "@/lib/prisma";

export type Post = {
    id: string;
    content: string;
    createdAt: Date;
    userId: string;
    user: {
        firstName?: string | null;
        lastName?: string | null;
        email: string;
    };
};

export async function fetchPosts(): Promise<Post[]> {
    const posts = await prisma.posts.findMany({
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return posts;

console.log('posts fetched', posts); 

}