import { NextRequest } from 'next/server';
import { Server } from 'socket.io';
import { createServer } from 'http';

const ALLOWED_ORIGIN =
    process.env.NODE_ENV === 'production'
        ? 'https://savy19.fyi'
        : '*';

export async function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true',
        },
    });
}

export async function GET() {
    return Response.json({ ok: true }, {
        headers: { 'Access-Control-Allow-Origin': ALLOWED_ORIGIN },
    });
}

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true,
    },
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('join_room', (roomId) => {
        socket.join(roomId);
        console.log(`User with ID ${socket.id} joined room ${roomId}`);
    });

    socket.on('send_msg', (data) => {
        console.log('Received message:', data);
        socket.to(data.roomId).emit('receive_msg', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

export async function startSocketServer(req: NextRequest) {
    if (!httpServer.listening) {
        httpServer.listen(3001, () => {
            console.log('Socket.io server is running on port 3001');
        });
    }
    return new Response('WebSocket server is running', { status: 200 });
}
