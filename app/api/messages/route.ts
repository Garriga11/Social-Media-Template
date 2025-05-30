import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, msg, roomId } = body;

        // Validate required fields
        if (!roomId || !msg || !userId) {
            return new Response("Missing fields", { status: 400 });
        }

        // Save the message to the database
        const saved = await prisma.message.create({
            data: {
                roomId,
                msg,
                userId,
                createdAt: new Date(),
            },
        });

        return NextResponse.json(saved);
    } catch (error) {
        console.error("Error saving message:", error);
        return new Response("Error saving message", { status: 500 });
    }
}