import { Server } from "socket.io";
import { createServer } from "http"; // This is the correct import for creating the HTTP server
import jwt from "jsonwebtoken";


const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "https://savvy19.com",
        methods: ["GET", "POST"],
        credentials: true,
        allowedHeaders: ["Authorization", "Content-Type"],
    },
    allowRequest: (req, callback) => {
        const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"
        if (validateToken(token)) {
            callback(null, true);
        } else {
            callback("Unauthorized", false);
        }
    },
});

const headers = new Headers();
headers.set("Access-Control-Allow-Origin", "https://savvy19.com");
headers.set("Access-Control-Allow-Methods", "GET, POST");
headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
headers.set("Access-Control-Allow-Credentials", "true");



io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join_room", (roomId) => {
        socket.join(roomId);
        console.log(`User with ID ${socket.id} joined room ${roomId}`);
    });

    socket.on("send_msg", (data) => {
        console.log("Received message:", data);
        io.to(data.roomId).emit("receive_msg", data); 
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    });

    socket.on("error", (err) => {
        console.error("Socket error:", err);
    });
});



export async function GET() {
    return new Response("WebSocket server is active!", { status: 200 });
}

function validateToken(token: string | undefined): boolean {
    if (!token) return false;

    try {
        const secretKey = process.env.JWT_SECRET; // Use the secret key from .env
        if (!secretKey) {
            throw new Error("JWT_SECRET is not defined in the environment variables.");
        }
        jwt.verify(token, secretKey); // Verify the token
        return true; // Token is valid
    } catch (err) {
        console.error("Invalid token:", err);
        return false; // Token is invalid
    }


    
}