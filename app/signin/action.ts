import { auth, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function createUserIfNotExists() {
    const { userId } = await auth();

    if (!userId) return;

    const existingUser = await prisma.user.findUnique({
        where: { clerkId: userId },
    });

    if (!existingUser) {
        const clerk = await clerkClient();
        const clerkUser = await clerk.users.getUser(userId);

        await prisma.user.create({
            data: {
                clerkId: clerkUser.id,
                firstName: clerkUser.firstName || "",
                lastName: clerkUser.lastName || "",
                email: clerkUser.emailAddresses[0]?.emailAddress || "",
                imageUrl: clerkUser.imageUrl,
            },
        });
    }
}
