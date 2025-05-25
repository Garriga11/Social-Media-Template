// app/actions/deletePost.ts
'use server'

import { useAuth } from '@clerk/nextjs'
import  prisma  from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deletePost(postId: number) {
    const { userId } = useAuth()
    if (!userId) throw new Error('Not authenticated')

    const post = await prisma.post.findUnique({ where: { id: postId } })

    if (!post || post.clerkId !== userId) {
        throw new Error('Not authorized to delete this post')
    }

    await prisma.post.delete({ where: { id: postId } })
    revalidatePath('/feed') // Adjust this path to your actual feed page
}
