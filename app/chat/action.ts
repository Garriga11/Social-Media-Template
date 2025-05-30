export async function saveMessage({ roomId, userId, msg }: { roomId: string; userId: string; msg: string }) {
    try {
        const response = await fetch("/api/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ roomId, userId, msg }),
        });

        if (!response.ok) {
            throw new Error("Failed to save message");
        }

        return await response.json();
    } catch (error) {
        console.error("Error in saveMessage action:", error);
        throw error;
    }
}