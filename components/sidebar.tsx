"use client";

import Link from "next/link";

export function Sidebar() {
    return (
        <aside className="w-64 p-6 bg-white-800 border-black shadow-1g border-radius-2xl text-black h-screen p-4 flex flex-col">
            <h2 className="text-xl font-bold mb-6">Navigation</h2>
            <nav className="space-y-4">
                <Link href="/" className="block hover:underline">
                    Home
                </Link>
                <Link href="/feed" className="block hover:underline">
                    Feed
                </Link>
                <Link href="/createPost" className="block hover:underline">
                    Create Post
                </Link>
                <Link href="/profile" className="block hover:underline">
                    Profile
                </Link>
            </nav>
        </aside>
    );
}