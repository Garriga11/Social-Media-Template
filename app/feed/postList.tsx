'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { PostCard } from './postCard';
import { fetchPosts, Post } from './action';
import { DeletePostButton } from '@/app/delete/deleteButton';

export function PostList() {
  const { user } = useUser()
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    fetchPosts().then(setPosts).catch(console.error)
  }, [])

  return (
    <div className="space-y-4">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="relative">
            <PostCard
              content={post.content}
              createdAt={post.createdAt.toString()}
              user={{
                firstName: post.User.name ?? undefined,
                lastName: undefined,
                email: post.User.email,
                profileImage: null,
              }}
            />
            {user?.id === post.User.clerkId && (
              <div className="absolute top-2 right-2">
                <DeletePostButton
                  postId={parseInt(post.id)}
                  clerkId={post.User.clerkId}
                  onDeleted={() => {
                    setPosts((prev) => prev.filter((p) => p.id !== post.id))
                  }}
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  )
}
