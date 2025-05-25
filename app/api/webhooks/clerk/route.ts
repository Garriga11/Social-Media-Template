import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    const secret = process.env.SIGNING_SECRET;
    if (!secret) {
        console.error("Missing SIGNING_SECRET environment variable");
        return new Response("Missing secret", { status: 500 });
    }

    try {
        const wh = new Webhook(secret);
        const body = await req.text();
        const headerPayload = await headers();

        const event = wh.verify(body, {
            "svix-id": headerPayload.get("svix-id")!,
            "svix-timestamp": headerPayload.get("svix-timestamp")!,
            "svix-signature": headerPayload.get("svix-signature")!,
        }) as WebhookEvent;

        if (event.type === "user.created") {
            const { id } = event.data;

            // Fetch the full user data from Clerk
            const clerk = await clerkClient();
            const clerkUser = await clerk.users.getUser(id);

            if (!clerkUser) {
                console.error("Failed to fetch user data from Clerk.");
                return new Response("Failed to fetch user data", { status: 500 });
            }

            const email = clerkUser.emailAddresses[0]?.emailAddress || null;
            const firstName = clerkUser.firstName || null;
            const lastName = clerkUser.lastName || null;
            const profileImage = clerkUser.imageUrl || null;

            // Create or update the user in the database
            await prisma.user.upsert({
                where: { clerkId: id },
                update: {
                    email: email ?? undefined,
                    firstName: firstName ?? undefined,
                    lastName: lastName ?? undefined,
                    profileImage: profileImage ?? undefined,
                },
                create: {
                    clerkId: id,
                    email: email ?? "",
                    firstName: firstName ?? "",
                    lastName: lastName ?? "",
                    profileImage: profileImage ?? "",
                },
            });

            console.log("User created or updated successfully in the database.");
        }

        return new Response("OK");
    } catch (error) {
        console.error("Error processing webhook:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
