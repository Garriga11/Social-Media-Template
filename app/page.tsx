
"use client";

import Image from "next/image";
import Link from "next/link";
import { UserProfile, useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <section className="flex-grow flex flex-col items-center justify-center text-center px-4 sm:px-8 lg:px-16 py-20 bg-gradient-to-b from-white to-gray-100">
        <Image
          src="/logo.jpg"
          alt="Savy logo"
          width={180}
          height={180}
          className="mb-8 rounded-full shadow-xl"
        />
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-4 leading-tight">
          <span className="text-gray-600">Savy</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-8">
          A modern social media starter built with Next.js 15, Tailwind, and Clerk — powered by Vercel.
        </p>

        {user && (
          <p className="text-md sm:text-lg text-blue-600 mb-6">
            Hello, <span className="font-semibold text-blue-500">{user.firstName || "User"}</span>
          </p>
        )}

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/feed"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Go To Feed
          </Link>
          <Link
            href="/createPost"
            className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
          >
            Create A Post
          </Link>
          <Link
            href="user"
            className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition">
       User Profile
          </Link>

          <Link
            href="/chat"
            className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition">
            Start A Chat 
          </Link>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-8 lg:px-16 bg-gray-50 border-t border-gray-200">

      </section>

      <footer className="w-full bg-white border-t border-gray-200 text-center text-sm py-6 text-gray-500">
        © 2025 Savy. A G19 Programs Project All rights reserved.
      </footer>
    </main>
  );
}