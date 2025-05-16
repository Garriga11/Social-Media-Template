"use client";

import { useState, startTransition } from "react";
import { updateUserProfile } from "@/app/signin/action";

export function ProfileForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        image: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        startTransition(() => {
            updateUserProfile(formData).catch((err) => {
                console.error("Update failed", err);
            });
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Your inputs for firstName, lastName, email, image */}
            <button type="submit">Save</button>
        </form>
    );
}
