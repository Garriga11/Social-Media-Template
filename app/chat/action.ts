import prisma from "@/lib/prisma";

export async function saveMessage({ roomId, userId, msg }: { roomId: string; userId: string; msg: string }) {
    try {
        // Save the message to the database
        const savedMessage = await prisma.message.create({
            data: {
                roomId,
                msg,
                userId: parseInt(userId, 10), // Convert userId to a number if necessary
                createdAt: new Date(),
            },
        });

        return savedMessage;
    } catch (error) {
        console.error("Error saving message:", error);
        throw new Error("Failed to save message");
    }
}