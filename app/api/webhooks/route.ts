import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        return new NextResponse('Webhook secret not set', { status: 500 });
    }

    const payload = await req.text();
    const headerList = await headers(); 
    const headerPayload = Object.fromEntries(headerList.entries());

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: { type: string };

    try {
        evt = wh.verify(payload, headerPayload) as { type: string };
    } catch (err) {
        console.error('Webhook verification failed:', err);
        return new NextResponse('Invalid signature', { status: 400 });
    }

    console.log('Clerk Webhook Event Received:', evt.type);

    return new NextResponse('Webhook received', { status: 200 });
}
