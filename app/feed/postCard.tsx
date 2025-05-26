"use client";
import React from "react";

type Props = {
    content: string;
    createdAt: string;
    user: {
        firstName?: string;
        lastName?: string;
        email: string;
    };
};

export function PostCard({ content, createdAt, user }: Props) {
    return (
        <div className="p-4 border rounded shadow">
            <p className="text-sm text-gray-600">
                {user.firstName || user.email || "Unknown User"} · {new Date(createdAt).toLocaleString()}
            </p>
            <p className="mt-2">{content}</p>
        </div>
    );
}
