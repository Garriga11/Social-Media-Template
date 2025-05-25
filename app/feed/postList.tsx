"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { PostCard } from "@/app/feed/postCard";
import { DeletePostButton } from "@/app/delete/deleteButton";
import { EditPostForm } from "@/app/editPosts/editPostForm";

export interface Post {
    id: number;
    content: string | null;
    createdAt: string;
    author: {
        id: number;
        clerkId: string;
        firstName: string | null;
        lastName: string | null;
        profileImage: string | null;
    };
}

export function PostList() {
    const { user } = useUser();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadPosts() {
            try {
                const res = await fetch("/api/posts");
                if (!res.ok) {
                    throw new Error(`Failed to fetch posts: ${res.statusText}`);
                }
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                console.error("Failed to load posts:", err);
                setError("Failed to load posts. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        loadPosts();
    }, []);

    if (loading) {
        return <p>Loading posts...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="space-y-4">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.id} className="relative border p-4 rounded-md">
                        {/* PostCard Component */}
                        <PostCard
                            content={post.content ?? ""}
                            createdAt={post.createdAt}
                            user={{
                                firstName: post.author?.firstName ?? "Unknown",
                                lastName: post.author?.lastName ?? "User",
                                email: post.author?.clerkId ?? "No Email",
                                profileImage: post.author?.profileImage ?? null,
                            }}
                        />

                        {/* Actions for the Post Author */}
                        {user?.id === post.author?.clerkId && (
                            <div className="mt-4 flex gap-4">
                                <EditPostForm
                                    postId={post.id}
                                    clerkId={post.author.clerkId}
                                    initialContent={post.content ?? ""}
                                />
                                <DeletePostButton
                                    postId={post.id}
                                    clerkId={post.author.clerkId}
                                />
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
