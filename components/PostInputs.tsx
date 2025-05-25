"use client";

import { useState } from "react";

export default function PostInputs() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    async function createPost(e: React.FormEvent) {
        e.preventDefault();
        if (!title || !content) return;

        await fetch("/api/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content }),
        });

        setTitle("");
        setContent("");
        location.reload();
    }
}