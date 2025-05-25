'use client'

import { useUser } from '@clerk/nextjs'
import { useTransition } from 'react'
import { deletePost } from '@/app/delete/action'

type Props = {
  postId: number
  postClerkId: string
}

export function DeletePostButton({ postId, postClerkId }: Props) {
  const { user } = useUser()
  const [isPending, startTransition] = useTransition()

  if (user?.id !== postClerkId) return null

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this post?')) return

    startTransition(() => {
      deletePost(postId).catch((err) => {
        console.error('Failed to delete post:', err)
        alert('Something went wrong while deleting the post.')
      })
    })
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className={`px-3 py-1 rounded text-sm font-medium transition ${
        isPending
          ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
          : 'bg-red-600 text-white hover:bg-red-700'
      }`}
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  )
}
