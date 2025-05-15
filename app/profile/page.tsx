
'use client";'
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
import { UserProfileForm } from "@/app/profile/userProfileForm";

export default async function DashboardPage() {
    const { userId } = await auth();

    if (!userId) {
        return <div className="p-6 text-red-500">Unauthorized: Please sign in.</div>;
    }

    // Check if the user exists in the database
    let user = await prisma.user.findUnique({
        where: { clerkId: userId },
    });

    // If the user does not exist, create a new user record
    if (!user) {
        user = await prisma.user.create({
            data: {
                clerkId: userId,
                firstName: "", 
                lastName: "", 
                email: "", // Default last name, can be updated later
                imageUrl: "", // Default image URL, can be updated later
            },
        });
    }

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
            <UserProfileForm
                user={{
                    firstName: user.firstName ?? "",
                    lastName: user.lastName ?? "",
                    email: user.email ?? "",
                    image: user.imageUrl ?? "",
                }}
            />
        </div>
    );
}