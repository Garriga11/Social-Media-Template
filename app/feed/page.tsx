"use client";

import { PostList } from "@/app/feed/postList"; // Import PostList

export default function FeedPage() {
    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold mb-4">Feed</h1>
            <PostList /> {/* Render PostList */}
        </div>
    );
}