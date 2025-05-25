// filepath: c:\Users\garri\OneDrive\Desktop\New folder (28)\posts\app\feed\postList.tsx
"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { PostCard } from "@/app/feed/postCard";

import { fetchPosts, Post } from "@/app/feed/action"; // Import Post type and fetchPosts

export function PostList() {
    const { user } = useUser();
    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        async function loadPosts() {
            try {
                const res = await fetch('/api/posts');
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                console.error('Failed to load posts:', err);
            }
        }

        loadPosts();
    }, []);


    return (
        <div className="space-y-4">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.id} className="relative">
                        <PostCard
                            content={post.content}
                            createdAt={post.createdAt.toString()}
                            user={{
                                ...post.User,
                                firstName: post.User.name ?? undefined,
                                lastName: undefined, // Adjusted as 'lastName' is not defined in the Post type
                            }}
                        />
                        {user?.id === post.User.clerkId && (
                            <div className="absolute top-2 right-2">
                             
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
}