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
            const data: Post[] = await fetchPosts(); // Explicitly type the data
            console.log("Fetched posts in PostList:", data); // Debugging
            setPosts(
                data.map((post: Post) => ({
                    ...post,
                    createdAt: new Date(post.createdAt), // Ensure createdAt is a Date
                }))
            ); // Update the state with the fetched posts
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
                                ...post.user,
                                firstName: post.user.firstName ?? undefined,
                                lastName: post.user.lastName ?? undefined,
                            }}
                        />
                        {user?.id === post.userId && (
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