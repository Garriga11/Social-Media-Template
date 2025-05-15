"use client"

import  deletePost from "@/app/posts/deletePosts";

function DeleteButton({ postId }: { postId: string }) {
    const handleDelete = async () => {
        try {
            await deletePost(postId);
            // optionally revalidate or show success
        } catch (err) {
            console.error(err);
        }
    };

    return <button onClick={handleDelete}>Delete</button>
}
