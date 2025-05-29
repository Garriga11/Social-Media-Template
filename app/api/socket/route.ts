import { Server } from "socket.io";
import { createServer } from "http";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from 'next/server';



const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "https://savvy19.com/chat/chatComponent", // ✅ Ensure your frontend domain is correctly set
        methods: ["GET", "POST"],
        credentials: true,
        allowedHeaders: ["Authorization", "Content-Type"],
        exposedHeaders: ["Authorization", "Content-Type"],
    },
});

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join_room", (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on("send_msg", (data) => {
        console.log("Received message:", data);
        io.to(data.roomId).emit("receive_msg", data);
        io.emit('broadcast', message);
       });
     });
     return NextResponse.json({});
   }

    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });

    socket.on("error", (err) => {
        console.error("Socket error:", err);
    });
});


export async function GET(req: NextRequest) {
    return new Response("WebSocket server is active!", {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "https://savvy19.com/chat/chatComponent",
            "Access-Control-Allow-Methods": "GET, POST",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Credentials": "true",
        },
    });
}

function validateToken(token: string | undefined): boolean {
    if (!token) return false;

    try {
        const secretKey = process.env.JWT_SECRET; 
        if (!secretKey) {
            throw new Error("JWT_SECRET is missing in environment variables.");
        }
        jwt.verify(token, secretKey);
        return true;
    } catch (err) {
        console.error("Invalid token:", err);
        return false;
    }
} 
