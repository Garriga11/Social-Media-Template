
"use client";

import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";



export default async function Home() {
    const user = await currentUser();
    if (!user) return <div className="flex justify-center">Sign in to post</div>;

    const posts = await prisma.post.findMany({
        where: { author: { clerkId: user.id } },
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            clerkId: true,
            content: true,
            createdAt: true,
            author: {
                select: {
                    id: true,
                    clerkId: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
    function PostInputs() {
        return (
            <div>
                {/* Add your input fields or UI elements here */}
                <input type="text" placeholder="Write your post..." className="border p-2 rounded w-full" />
                <button className="mt-2 bg-blue-500 text-white py-1 px-4 rounded">Post</button>
                {posts.map((post: { id: number; content: string | null; createdAt: Date; author: { name: string | null } }) => (
                    <div key={post.id} className="p-4 border border-zinc-800 rounded mt-4">
                        <h2 className="font-bold">{post.author.name || "Unknown Author"}</h2>
                        <p className="mt-2">{post.content || "No content available"}</p>
                    </div>
                ))}
            </div>
        );
    }
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                        <h2 className="font-bold">{posts.length > 0 ? posts[0].author.name || "Unknown Author" : "No Posts Available"}</h2>
            <PostInputs/>
            <div className="mt-8">
                {posts.map((post: { id: number; content: string | null; createdAt: Date; author: { name: string | null } }) => (
                    <div
                        key={post.id}
                        className="p-4 border border-zinc-800 rounded mt-4">
                        <h2 className="font-bold">{post.author.name || "Unknown Author"}</h2>
                        <p className="mt-2">{post.content || "No content available"}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}