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
        const { user, msg, createdAt, roomId } = body;

        if (!roomId || !msg || !user) {
            return new Response("Missing fields", { status: 400 });
        }

        const saved = await db.message.create({
            data: { roomId, user, msg, createdAt },
        });

        return NextResponse.json(saved);
    } catch (error) {
        return new Response("Error saving message", { status: 500 });
    }
}