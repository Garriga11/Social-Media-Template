"use client";
import { io } from "socket.io-client";
import { useState } from "react";
import ChatPage from "@/app/chat/chatComponent";

export default function Home() {
    const [showChat, setShowChat] = useState(false);
    const [userName, setUserName] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);
    const [roomId, setroomId] = useState("");

    const socket = io("https://savvy19.com/api/socket");


    const handleJoin = () => {
        if (userName !== "" && roomId !== "") {
            console.log(userName, "userName", roomId, "roomId");
            socket.emit("join_room", roomId);
            setShowSpinner(true);

            // Simulating loading before showing chat
            setTimeout(() => {
                setShowChat(true);
                setShowSpinner(false);
            }, 4000);
        } else {
            alert("Please fill in Username and Room ID");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            {!showChat ? (
                <div className="flex flex-col items-center gap-4 border border-gray-300 p-6 rounded-lg shadow-md">
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUserName(e.target.value)}
                        disabled={showSpinner}
                        className="p-2 border rounded-md w-64"
                    />
                    <input
                        type="text"
                        placeholder="Room ID"
                        onChange={(e) => setroomId(e.target.value)}
                        disabled={showSpinner}
                        className="p-2 border rounded-md w-64"
                    />
                    <button
                        onClick={handleJoin}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                        {!showSpinner ? "Join" : <div className="animate-spin border-t-2 border-white rounded-full w-5 h-5"></div>}
                    </button>
                </div>
            ) : (
                <ChatPage socket={socket} roomId={roomId} username={userName} />
            )}
        </div>
    );
}
