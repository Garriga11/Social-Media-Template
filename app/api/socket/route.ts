import { Server } from "socket.io";
import { createServer } from "http"; // For creating the HTTP server
import express from "express"; // Import Express
import jwt from "jsonwebtoken";

const app = express(); // Create an Express app

// Middleware to parse JSON requests (if needed for your HTTP routes)
app.use(express.json());

// Example HTTP route
app.get("/api/example", (req, res) => {
    res.json({ message: "Hello from the REST API!" });
});

// Add more HTTP routes as needed
app.get("/api/status", (req, res) => {
    res.json({ status: "WebSocket server is running!" });
});

// Create the HTTP server and attach Express
const httpServer = createServer(app);

// Attach Socket.IO to the HTTP server
const io = new Server(httpServer, {
    cors: {
        origin: "https://savvy19.fyi", // Your frontend's production URL
        methods: ["GET", "POST"],
        credentials: true,
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

// Socket.IO logic
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

// Start the server
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});

// Token validation function
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