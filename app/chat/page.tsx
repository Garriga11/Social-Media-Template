"use client";
import { io } from "socket.io-client";
import { useState, useEffect, useMemo } from "react";
import ChatPage from "@/app/chat/chatComponent";

// Room selection modal
const RoomSelectionModal = ({ onSelectRoom }: { onSelectRoom: (roomId: string) => void }) => {
  const rooms = ["Room 1", "Room 2", "Room 3"];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Select a Room</h2>
        {rooms.map((room) => (
          <button
            key={room}
            onClick={() => onSelectRoom(room)}
            className="block w-full px-4 py-2 mb-2 bg-blue-500 text-white rounded-md"
          >
            {room}
          </button>
        ))}
      </div>
    </div>
  );
};

export default function ChatHome() {
  const [showChat, setShowChat] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [roomId, setRoomId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const socket = useMemo(() => io("https://savvy19.fyi/api/socket"), []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleOpenModal = () => {
    if (!firstName || !lastName) {
      alert("Please enter your name first");
      return;
    }
    setShowModal(true);
  };

  const handleJoinRoom = (roomId: string) => {
    setRoomId(roomId);
    socket.emit("join_room", roomId);
    setShowModal(false);
    setShowChat(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {!showChat ? (
        <>
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            className="p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            className="p-2 border rounded mb-4"
          />
          <button
            onClick={handleOpenModal}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Join Chat Room
          </button>
          {showModal && <RoomSelectionModal onSelectRoom={handleJoinRoom} />}
        </>
      ) : (
        <ChatPage socket={socket} firstName={firstName} lastName={lastName} roomId={roomId} />
      )}
    </div>
  );
}
