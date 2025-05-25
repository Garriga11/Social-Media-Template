'use client'

import { useUser } from '@clerk/nextjs'
import { useTransition, useState } from 'react'
import { deletePost } from '@/app/delete/action'

type Props = {
  postId: number
  postClerkId: string
}

export function DeletePostButton({ postId, postClerkId }: Props) {
  const { user } = useUser()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  // Only show button if the logged-in user owns this post
  if (user?.id !== postClerkId) return null

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this post?')) return

    setError(null) // reset previous errors

    startTransition(() => {
      deletePost(postId)
        .then(() => {
          // Optionally: You can add some success feedback here or refresh UI
          console.log('Post deleted')
        })
        .catch((err) => {
          console.error('Failed to delete post:', err)
          setError(err.message || 'Something went wrong while deleting the post.')
        })
    })
  }

  return (
    <>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className={`px-3 py-1 rounded text-sm font-medium transition 
          ${isPending
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : 'bg-red-600 text-white hover:bg-red-700'}`}
      >
        {isPending ? 'Deleting...' : 'Delete'}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </>
  )
}
