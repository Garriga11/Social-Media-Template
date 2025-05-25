'use server'

import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deletePost(postId: number) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Not authenticated')
  }

  const post = await prisma.post.findUnique({
    where: { id: postId }
  })

  if (!post) {
    throw new Error('Post not found')
  }

  if (post.clerkId !== userId) {
    throw new Error('Not authorized')
  }

  await prisma.post.delete({
    where: { id: postId }
  })

  revalidatePath('/feed')
}
