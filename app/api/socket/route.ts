// app/api/messages/route.ts
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");

  if (!roomId) {
    return NextResponse.json({ error: "Missing roomId" }, { status: 400 });
  }

  const messages = await db.message.findMany({
    where: { roomId },
    orderBy: { time: 'asc' },
  });

  return NextResponse.json(messages);
}
