'use server';

import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function deletePost(postId: string) {
const { userId } = await auth();
if (!userId) throw new Error('Unauthorized');

const posts = await prisma.posts.findUnique({ where: { id: postId } });

if (!posts || posts.userId !== userId) {
throw new Error('Forbidden or not found');
}

await prisma.posts.delete({ where: { id: postId } });
}