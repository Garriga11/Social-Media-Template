"use client";
import React from "react";

type Props = {
    content: string;
    createdAt: string;
    user: {
        firstName?: string;
        lastName?: string;
        email: string;
        profileImage?: string | null; // Added profileImage property
    };
};

export function PostCard({ content, createdAt, user }: Props) {
    return (
        <div className="p-4 border rounded shadow">
            <div className="flex items-center space-x-4">
                {user.profileImage && (
                    <img
                        src={user.profileImage}
                        alt={`${user.firstName || "User"}'s profile`}
                        className="w-10 h-10 rounded-full"
                    />
                )}
                <p className="text-sm text-gray-600">
                    {user.firstName || user.email || "Unknown User"} · {new Date(createdAt).toLocaleString()}
                </p>
            </div>
            <p className="mt-2">{content}</p>
        </div>
    );
}
