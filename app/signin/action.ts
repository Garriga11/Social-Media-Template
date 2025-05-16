

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function updateUserProfile(data: {
    firstName: string;
    lastName: string;
    image: string;
    email: string;
}) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized: User is not signed in.");
    }

    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
    });

    if (!user) {
        throw new Error("User not found in the database.");
    }

    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            imageUrl: data.image,
        },
    });

    return updatedUser;
}
