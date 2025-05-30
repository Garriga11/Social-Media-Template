"use client";
import React, { useEffect, useState } from "react";
import { saveMessage } from "@/app/chat/action";

interface IMsgDataTypes {
  roomId: string;
  user: string;
  msg: string;
  time: string;
}

const ChatPage = ({ socket, firstName, lastName, roomId, userId }: any) => {
  const fullName = `${firstName} ${lastName}`;
  const [currentMsg, setCurrentMsg] = useState("");
  const [chat, setChat] = useState<IMsgDataTypes[]>([]);

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMsg.trim()) return;

    const msgData: IMsgDataTypes = {
      roomId,
      user: fullName,
      msg: currentMsg,
      time: new Date().toLocaleString(),
    };

    setChat((prev) => [...prev, msgData]); // Show message instantly
    socket.emit("send_msg", msgData);

    try {
      // Call the server action to save the message
      await saveMessage({ roomId, userId, msg: currentMsg });
    } catch (error) {
      console.error("Failed to save message:", error);
    }

    setCurrentMsg("");
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`/api/messages?roomId=${roomId}`);
      const data = await res.json();
      setChat(data);
    };

    fetchMessages();

    socket.on("receive_msg", (data: IMsgDataTypes) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_msg");
    };
  }, [roomId]);

  return (
    <div className="w-full max-w-md mx-auto border p-4 rounded shadow">
      <h3 className="mb-4 text-center">
        Chatting as <strong>{fullName}</strong> in <strong>{roomId}</strong>
      </h3>
      <div className="h-64 overflow-y-auto space-y-2 mb-4">
        {chat.map(({ user, msg, time }, idx) => (
          <div key={idx} className={`text-sm ${user === fullName ? "text-right" : "text-left"}`}>
            <div className={`inline-block px-2 py-1 rounded ${user === fullName ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
              <p>{msg}</p>
              <p className="text-xs">{user} @ {time}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={sendData} className="flex gap-2">
        <input
          value={currentMsg}
          onChange={(e) => setCurrentMsg(e.target.value)}
          placeholder="Type message..."
          className="flex-grow p-2 border rounded"
        />
        <button className="bg-blue-600 text-white px-3 rounded">Send</button>
      </form>
    </div>
  );
};

export default ChatPage;