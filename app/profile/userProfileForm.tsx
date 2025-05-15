"use client";

import { useState, FormEvent } from "react";
import { fetchUserProfile } from "@/app/profile/action";

export function UserProfileForm({ user }: { user: { firstName?: string; lastName?: string; email: string; image?: string } }) {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const email = formData.get("email") as string;
        const imageUrl = formData.get("image") as string;

        try {
            await fetchUserProfile({ firstName, lastName, email: user.email, imageUrl });
            setError(null);
            setSuccess("Profile updated successfully!");
        } catch (err: any) {
            setError(err.message || "Failed to update profile.");
            setSuccess(null);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                </label>
                <input
                    type="text"
                    name="firstName"
                    defaultValue={user.firstName || ""}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                </label>
                <input
                    type="text"
                    name="lastName"
                    defaultValue={user.lastName || ""}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="text"
                    name="email"
                    defaultValue={user.email || ""}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Profile Image URL
                </label>
                <input
                    type="text"
                    name="image"
                    defaultValue={user.image || ""}
                    className="w-full p-2 border rounded"
                />
            </div>
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Update Profile
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
        </form>
    );
}