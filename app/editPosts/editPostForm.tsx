'use client'

import { useState, useTransition } from 'react'
import { useUser } from '@clerk/nextjs'
import { editPost } from '@/app/editPosts/action';

type Props = {
    postId: number
    postClerkId: string
    initialContent: string
}

export function EditPostForm({ postId, postClerkId, initialContent }: Props) {
    const { user } = useUser()
    const [content, setContent] = useState(initialContent)
    const [editing, setEditing] = useState(false)
    const [isPending, startTransition] = useTransition()

    if (user?.id !== postClerkId) return null

    const handleSubmit = () => {
        startTransition(() => {
            editPost(postId, content)
            setEditing(false)
        })
    }

    return editing ? (
        <div className="space-y-2">
            <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                className="w-full border rounded p-2"
            />
            <div className="space-x-2">
                <button onClick={handleSubmit} disabled={isPending} className="text-green-600">
                    {isPending ? 'Saving...' : 'Save'}
                </button>
                <button onClick={() => setEditing(false)} className="text-gray-500">
                    Cancel
                </button>
            </div>
        </div>
    ) : (
        <button onClick={() => setEditing(true)} className="text-blue-600 text-sm">
            Edit
        </button>
    )
}
