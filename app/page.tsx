"use client";

import Image from "next/image";
import Link from "next/link";
import { UserProfile, useUser } from "@clerk/nextjs";

export default async function Home() {
  const { user } = useUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8 bg-gray-50 text-gray-800 shadow-lg rounded-lg">
      <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight text-center">
        Savy <br />
      </h1>
      <p className="text-lg text-gray-600 text-center">
        A Social Media Template Built On NextJS & Powered By Vercel<br />
      </p>
      <Image
        src="/logo.jpg"
        alt="logo"
        width={500}
        height={300}
        className="mt-8 rounded-lg shadow-sm flex justify left"
      />
      {user && (
        <p className="text-lg text-blue-600 text-center">
          Hello {user.firstName || "User"}
        </p>
      )}
      <Link
        href="/feed"
        className="mt-4 text-white bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg transition-shadow p-3 rounded-lg"
      >
        Go To Feed
      </Link>
      <Link
        href="/createPost"
        className="mt-4 text-white bg-green-500 hover:bg-green-600 shadow-md hover:shadow-lg transition-shadow p-3 rounded-lg"
      >
        Create A Post
      </Link>
      <Link
        href="/user"
        className="mt-4 text-white bg-purple-500 hover:bg-purple-600 shadow-md hover:shadow-lg transition-shadow p-3 rounded-lg"
      >
        Update Profile
      </Link>
      <div className="mt-8 p-4 bg-white rounded-lg shadow-lg">
        <UserProfile path="/profile" routing="path" />
      </div>
      <footer className="mt-8 w-full bg-gray-800 text-white text-center p-4">
        <p>© 2025 Savy. All rights reserved.</p>
      </footer>
    </main>
  );
}