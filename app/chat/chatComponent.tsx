"use client";
import React, { useEffect, useState, useCallback } from "react";
import { io } from "socket.io-client";

interface IMsgDataTypes {
    roomId: string | number;
    user: string;
    msg: string;
    time: string;
}

const ChatPage = ({ socket, firstName, lastName, roomId }: any) => {
    console.log("Props in ChatPage:", { socket, firstName, lastName, roomId });

    const [currentMsg, setCurrentMsg] = useState("");
    const [chat, setChat] = useState<IMsgDataTypes[]>([]);

    const fullName = `${firstName} ${lastName}`; // Combine first and last name

    const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentMsg.trim() !== "") {
            const msgData: IMsgDataTypes = {
                roomId,
                user: fullName,
                msg: currentMsg,
                time: new Date().toLocaleTimeString(),
            };

            console.log("Sending message:", msgData);
            setChat((prev) => [...prev, msgData]); // ✅ Display message instantly
            await socket.emit("send_msg", msgData); // ✅ Broadcast to other users
            setCurrentMsg("");
        }
    };

    useEffect(() => {
        socket.on("receive_msg", (data: IMsgDataTypes) => {
            console.log("Message received:", data);
            setChat((prev) => [...prev, data]); // ✅ Updates chat state immediately
        });

        return () => {
            socket.off("receive_msg");
        };
    }, [socket]);

    return (
        <div className="flex flex-col items-center p-4">
            <div className="border border-gray-300 rounded-lg p-4 w-full max-w-md">
                <div className="mb-4 text-center">
                    <p>
                        Name: <b>{fullName}</b> | Room ID: <b>{roomId}</b>
                    </p>
                </div>

                <div className="space-y-2 overflow-y-auto max-h-80">
                    {chat.map(({ user, msg, time }, key) => (
                        <div
                            key={key}
                            className={`flex items-center ${user === fullName ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`p-2 rounded-lg max-w-xs ${user === fullName ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                            >
                                <span className="text-sm font-bold">{user.charAt(0)}</span>
                                <p className="text-sm">{msg}</p>
                                <span className="text-xs text-gray-600">{time}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <form onSubmit={sendData} className="mt-4 flex">
                    <input
                        type="text"
                        value={currentMsg}
                        placeholder="Type your message..."
                        onChange={(e) => setCurrentMsg(e.target.value)}
                        className="flex-grow p-2 border border-gray-300 rounded-l-md"
                    />
                    <button className="bg-blue-500 text-white p-2 rounded-r-md">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatPage;
