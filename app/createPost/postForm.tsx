"use client";

import { useState } from "react";
import { createPost } from "@/app/createPost/action"; 

export function CreatePostForm() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const content = form.content.value.trim();

        if (!content) {
            setError("Content cannot be empty.");
            return;
        }

        setIsLoading(true); // Set loading state
        try {
            await createPost(content);
            setError(null);
            console.log("Post created successfully!");
            window.location.href = "/feed";
        } catch (err: any) {
            setError(err.message || "Failed to create post.");
        } finally {
            setIsLoading(false); // Reset loading state
        }
    }; // <-- Ensure this closing brace is present

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <input
                type="text"
                name="content"
                placeholder="Write your post here"
                className="w-full p-2 border rounded"
                aria-label="Post content"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={isLoading} // Disable button while loading
            >
                {isLoading ? "Submitting..." : "Submit"}
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
    );
}
