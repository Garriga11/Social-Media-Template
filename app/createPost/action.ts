"use server"

import { auth } from "@clerk/nextjs/server";


import prisma from "@/lib/prisma";

export async function createPost(content: string) {
    const { userId } = await auth(); // Get the authenticated user's ID

    if (!userId) {
        throw new Error("Unauthorized: User is not signed in.");
    }

    // Find the user in the database using the Clerk ID
    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
    });

    if (!user) {
        throw new Error("User not found in the database.");
    }

    // Create the post
    const post = await prisma.posts.create({
        data: {
            content,
            userId: user.id, // Use the `id` from the User table
        },
    });

    return post;
}