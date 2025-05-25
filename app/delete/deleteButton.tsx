'use client';

import { useUser } from '@clerk/nextjs';
import { useTransition } from 'react';
import { deletePost } from '@/app/delete/action';

type Props = {
  postId: number
  clerkId: string
  onDeleted?: () => void
}

export function DeletePostButton({ postId, clerkId, onDeleted }: Props) {
  const { user } = useUser()
  const [isPending, startTransition] = useTransition()

  if (user?.id !== clerkId) return null

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this post?')) return

    startTransition(() => {
      deletePost(postId)
        .then(() => {
          if (onDeleted) onDeleted()
        })
        .catch((err) => {
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
