'use server';

import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deletePost(postId: number) {
  const { userId } = await auth()
  if (!userId) throw new Error('Not authenticated')

  const post = await prisma.post.findUnique({ where: { id: postId } })
  if (!post || post.clerkId !== userId) throw new Error('Not authorized')

  await prisma.post.update({
    where: { id: postId },
    data: { published: false },
  })

  revalidatePath('/feed')
}
