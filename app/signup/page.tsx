'use client';
import React from "react";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
            <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
            <div className="w-full max-w-md">
                <SignUp path="/sign-up" routing="path" />
            </div>
        </main>
    );
}