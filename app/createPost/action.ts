"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function createPost(content: string) {
    // Authenticate the user
    const { userId: clerkId } = await auth();

    if (!clerkId) {
        throw new Error("Unauthorized: User is not signed in.");
    }

    // Validate the content
    if (!content || content.trim().length === 0) {
        throw new Error("Validation error: Content cannot be empty.");
    }

    if (content.length > 500) {
        throw new Error("Validation error: Content exceeds the maximum length of 500 characters.");
    }

    // Find the user in the database using the Clerk ID
    const user = await prisma.user.findUnique({
        where: { clerkId },
    });

    if (!user) {
        throw new Error("User not found: Please ensure the user exists in the database.");
    }

    // Create the post
    try {
        const post = await prisma.post.create({
            data: {
                content,
                authorId: user.id,
                clerkId: user.clerkId,
            },
        });

        console.log("Post created successfully:", post);
        return post;
    } catch (error) {
        console.error("Error creating post:", error);
        throw new Error("Failed to create post.");
    }
}
