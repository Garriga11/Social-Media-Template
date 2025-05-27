"use client";
import { io } from "socket.io-client";
import { useState, useMemo, useEffect } from "react";
import ChatPage from "@/app/chat/chatComponent";

const RoomSelectionModal = ({ onSelectRoom }: { onSelectRoom: (roomId: string) => void }) => {
    const rooms = ["Room 1", "Room 2", "Room 3"]; // Example room list

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Select a Room</h2>
                <ul className="space-y-2">
                    {rooms.map((room) => (
                        <li key={room}>
                            <button
                                onClick={() => onSelectRoom(room)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                            >
                                {room}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default function Home() {
    const [showChat, setShowChat] = useState(false); // Controls whether the chat page is shown
    const [firstName, setFirstName] = useState(""); // Stores the user's first name
    const [lastName, setLastName] = useState(""); // Stores the user's last name
    const [roomId, setRoomId] = useState<string | null>(null); // Stores the selected room ID
    const [showModal, setShowModal] = useState(false); // Controls modal visibility

    const socket = useMemo(() => io("https://savvy19.fyi/api/socket"), []);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });

        socket.on("connect_error", (err) => {
            console.error("Socket connection error:", err);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    // Opens the modal if the user has filled in their name
    const handleOpenModal = () => {
        if (firstName !== "" && lastName !== "") {
            setShowModal(true);
        } else {
            alert("Please fill in First Name and Last Name before selecting a room.");
        }
    };

    // Joins the selected room and closes the modal
    const handleJoinRoom = (roomId: string) => {
        console.log("Joining room:", roomId);
        setRoomId(roomId);
        socket.emit("join_room", roomId);
        setShowChat(true);
        setShowModal(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            {!showChat ? (
                <>
                    <div className="flex flex-col items-center gap-4 border border-gray-300 p-6 rounded-lg shadow-md">
                        <input
                            type="text"
                            placeholder="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                            className="p-2 border rounded-md w-64"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                            className="p-2 border rounded-md w-64"
                        />
                        <button
                            onClick={handleOpenModal}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                        >
                            Select Room
                        </button>
                    </div>
                    {showModal && <RoomSelectionModal onSelectRoom={handleJoinRoom} />}
                </>
            ) : (
                <ChatPage socket={socket} roomId={roomId} firstName={firstName} lastName={lastName} />
            )}
        </div>
    );
}