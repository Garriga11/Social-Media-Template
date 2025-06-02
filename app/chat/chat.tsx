"use client";
import React, { useEffect, useState, useCallback } from "react";

interface IMsgDataTypes {
    roomId: string | number;
    user: string;
    msg: string;
    time: string;
}

const ChatPage = ({ socket, username, roomId }: any) => {
    const [currentMsg, setCurrentMsg] = useState("");
    const [chat, setChat] = useState<IMsgDataTypes[]>([]);

    const sendData = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (currentMsg !== "") {
                const msgData: IMsgDataTypes = {
                    roomId,
                    user: username,
                    msg: currentMsg,
                    time: new Date().toLocaleTimeString(),
                };
                await socket.emit("send_msg", msgData);
                setCurrentMsg("");
            }
        },
        [socket, currentMsg, username, roomId]
    );

    useEffect(() => {
        const handleReceiveMsg = (data: IMsgDataTypes) => {
            setChat((prev) => [...prev, data]);
        };

        socket.on("receive_msg", handleReceiveMsg);

        return () => {
            socket.off("receive_msg", handleReceiveMsg);
        };
    }, [socket]);

    return (
        <div className="flex flex-col items-center p-4">
            <div className="border border-gray-300 rounded-lg p-4 w-full max-w-md">
                <div className="mb-4 text-center">
                    <p>
                        Name: <b>{username}</b> | Room ID: <b>{roomId}</b>
                    </p>
                </div>

                <div className="space-y-2 overflow-y-auto max-h-80">
                    {chat.map(({ roomId, user, msg, time }, key) => (
                        <div
                            key={key}
                            className={`flex items-center ${user === username ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`p-2 rounded-lg max-w-xs ${user === username
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-black"
                                    }`}
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
