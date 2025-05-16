"use client"

import { deletePost as deletePostAPI } from "@/app/feed/action"; 
function deletePost({ postId }: { postId: string }) {
    const handleDelete = async () => {
        try {
            await deletePostAPI(postId);
            // optionally revalidate or show success
        } catch (err) {
            console.error(err);
        }
    };

    return <button onClick={handleDelete}>Delete</button>
}
