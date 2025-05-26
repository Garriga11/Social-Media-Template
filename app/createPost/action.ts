'use server';

import { useAuth } from '@clerk/nextjs';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createPost(content: string) {
    const { userId } = useAuth();
    if (!userId) throw new Error('Not authenticated');

    await prisma.post.create({
        data: {
            content,
            clerkId: userId,
            author: {
                connect: { id: Number(userId) }, // Assuming `userId` corresponds to the `id` of the author
            },
        },
    });

    // Revalidate the feed page to show the new post
    revalidatePath('/feed');
}
