import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const db = prisma;

export async function GET(req: NextRequest) {
    const roomId = req.nextUrl.searchParams.get("roomId");
    if (!roomId) {
        return new Response("Room ID required", { status: 400 });
    }

    try {
        const messages = await db.message.findMany({
            where: { roomId },
        });

        return NextResponse.json(messages);
    } catch (error) {
        return new Response("Error fetching messages", { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, msg, roomId } = body;

        // Validate required fields
        if (!roomId || !msg || !userId) {
            return new Response("Missing fields", { status: 400 });
        }

        // Save the message to the database
        const saved = await db.message.create({
            data: {
                roomId,
                msg,
                userId, // Use userId to link the message to a user
                createdAt: new Date(), // Ensure createdAt is set
            },
        });

        return NextResponse.json(saved);
    } catch (error) {
        console.error("Error saving message:", error);
        return new Response("Error saving message", { status: 500 });
    }
}