'use client'

import { useUser } from '@clerk/nextjs'
import { useTransition } from 'react'
import { deletePost } from '@/app/delete/action';

type Props = {
    postId: number
    postClerkId: string
}

export function DeletePostButton({ postId, postClerkId }: Props) {
    const { user } = useUser()
    const [isPending, startTransition] = useTransition()

    if (user?.id !== postClerkId) return null

    const handleDelete = () => {
        startTransition(() => {
            deletePost(postId)
        })
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="text-sm text-red-600"
        >
            {isPending ? 'Deleting...' : 'Delete'}
        </button>
    )
}
