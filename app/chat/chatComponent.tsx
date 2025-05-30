"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs"; // Import Clerk's useUser hook
import { saveMessage } from "@/app/chat/action";

interface IMsgDataTypes {
  roomId: string;
  user: string;
  msg: string;
  time: string;
}

const ChatPage = ({ socket, roomId }: any) => {
  const { user } = useUser(); // Get the authenticated user
  const [currentMsg, setCurrentMsg] = useState("");
  const [chat, setChat] = useState<IMsgDataTypes[]>([]);

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMsg.trim()) return;

    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    const msgData: IMsgDataTypes = {
      roomId,
      user: `${user.firstName} ${user.lastName}`, // Use Clerk's user details
      msg: currentMsg,
      time: new Date().toLocaleString(),
    };

    setChat((prev) => [...prev, msgData]); // Show message instantly
    socket.emit("send_msg", msgData);

    try {
      // Call the server action to save the message
      await saveMessage({ roomId, userId: user.id, msg: currentMsg }); // Include userId from Clerk's user object
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
        Chatting as <strong>{user?.firstName} {user?.lastName}</strong> in <strong>{roomId}</strong>
      </h3>
      <div className="h-64 overflow-y-auto space-y-2 mb-4">
        {chat.map(({ user: chatUser, msg, time }, idx) => (
          <div key={idx} className={`text-sm ${chatUser === `${user?.firstName} ${user?.lastName}` ? "text-right" : "text-left"}`}>
            <div className={`inline-block px-2 py-1 rounded ${chatUser === `${user?.firstName} ${user?.lastName}` ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
              <p>{msg}</p>
              <p className="text-xs">{`${user?.firstName} ${user?.lastName}`} @ {time}</p>
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