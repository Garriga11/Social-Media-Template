// app/actions/saveMessage.ts
'use server';
import prisma from '@/lib/prisma';
const db = prisma;

export async function saveMessage(data: {
    roomId: string;
    user: string;
    msg: string;
    time: string;
}) {
    return await db.message.create({ data });
}
