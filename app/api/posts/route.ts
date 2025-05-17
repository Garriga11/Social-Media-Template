import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    const posts = await prisma.posts.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },
        },
    });

    return NextResponse.json(posts);
}