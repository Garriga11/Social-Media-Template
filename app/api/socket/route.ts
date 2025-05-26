import { Server } from "socket.io";
import { createServer } from "http";
import { NextRequest } from "next/server";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "https://savvy19.com", // Use the frontend domain, not the API route
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join_room", (roomId) => {
        socket.join(roomId);
        console.log(`User with ID ${socket.id} joined room ${roomId}`);
    });

    socket.on("send_msg", (data) => {
        console.log("Received message:", data);
        socket.to(data.roomId).emit("receive_msg", data);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    });
});

export async function GET(req: NextRequest) {
    if (!httpServer.listening) {
        httpServer.listen(process.env.PORT || 3001, () => {
            console.log("Socket.io server is running...");
        });
    }
    return new Response("WebSocket server is active!", { status: 200 });
}
