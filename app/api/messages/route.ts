import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server"; // Import Clerk's getAuth

export async function POST(req: NextRequest) {
    try {
        // Get the authenticated user's information
        const { userId } = getAuth(req);

        if (!userId) {
            return new Response("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { msg, roomId } = body;

        // Validate required fields
        if (!roomId || !msg) {
            return new Response("Missing fields", { status: 400 });
        }

        // Save the message to the database
        const savedMessage = await prisma.message.create({
            data: {
                roomId,
                msg,
                userId: parseInt(userId, 10), // Ensure userId is a number if necessary
                createdAt: new Date(),
            },
        });

        return NextResponse.json(savedMessage);
    } catch (error) {
        console.error("Error saving message:", error);
        return new Response("Error saving message", { status: 500 });
    }
}