"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { PostCard } from "@/app/feed/postCard";
import DeleteButton from "@/app/feed/deleteButton";
import { fetchPosts } from "@/app/feed/action"; // Import fetchPosts from action

type Post = {
    id: string;
    content: string;
    createdAt: string; // already serialized
    userId: string;
    user: {
        firstName?: string;
        lastName?: string;
        email: string;
    };
};

export function PostList() {
    const { user } = useUser();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        async function loadPosts() {
            const data = await fetchPosts(); // Fetch posts from the server
            console.log("Fetched posts in PostList:", data); // Debugging
            setPosts(data); // Update the state with the fetched posts
        }

        loadPosts();
    }, []);

    return (
        <div className="space-y-4">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.id} className="relative">
                        <PostCard content={post.content} createdAt={post.createdAt} user={post.user} />
                        {user?.id === post.userId && (
                            <div className="absolute top-2 right-2">
                                <DeleteButton postId={post.id} />
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