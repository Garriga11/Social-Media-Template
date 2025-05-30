import  prisma from "@/lib/prisma"; 
import { NextRequest } from "next/server";

const db = prisma;

export async function GET(req: NextRequest) {
    const roomId = req.nextUrl.searchParams.get("roomId");
    if (!roomId) return new Response("Room ID required", { status: 400 });

    const messages = await db.message.findMany({
        where: { roomId },
        orderBy: { time: "asc" },
    });

    return Response.json(messages);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { user, msg, time, roomId } = body;

    if (!roomId || !msg || !user) {
        return new Response("Missing fields", { status: 400 });
    }

    const saved = await db.message.create({
        data: { roomId, user, msg, time },
    });

    return Response.json(saved);
}
