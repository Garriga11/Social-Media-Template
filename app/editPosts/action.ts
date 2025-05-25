// app/actions/editPost.ts
'use server'

import { useAuth } from '@clerk/nextjs'
import  prisma  from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function editPost(postId: number, newContent: string) {
    const { userId } = useAuth()
    if (!userId) throw new Error('Not authenticated')

    const post = await prisma.post.findUnique({ where: { id: postId } })
    if (!post || post.clerkId !== userId) throw new Error('Not authorized')

    await prisma.post.update({
        where: { id: postId },
        data: { content: newContent },
    })

    revalidatePath('/feed') // or wherever the post is displayed
}
