"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { PostCard } from "@/app/feed/postCard";

export interface Post {
    id: number;
    content: string | null;
    createdAt: string;
    author: {
        id: number;
        clerkId: string;
        firstName: string;
        lastName: string;
        profileImage: string | null;
    };
}

type Props = {
    content: string;
    createdAt: string;
    user: {
        firstName?: string;
        lastName?: string;
        email: string;
        profileImage?: string | null;
    };
};

export function PostList() {
    const { user } = useUser();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        async function loadPosts() {
            try {
                const res = await fetch("/api/posts");
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                console.error("Failed to load posts:", err);
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
                            content={post.content ?? ""}
                            createdAt={post.createdAt}
                            user={{
                                firstName: post.author.firstName,
                                lastName: post.author.lastName,
                                email: post.author.clerkId,
                            }}
                        />
                        {user?.id === post.author.clerkId && (
                            <div className="absolute top-2 right-2">
                                {/* Add any user-specific actions here */}
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
