"use client";

import { CreatePostForm } from "@/app/createPost/postForm"; // Adjust the import path as necessary


export default function createPost() {
    return (
        <div className="p-6">
            
            <h1 className="text-2xl font-bold mb-4">Create a Post</h1>
            <CreatePostForm />
         
        </div>
    );
}