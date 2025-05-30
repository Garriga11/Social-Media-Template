import prisma from "@/lib/prisma";

export async function saveMessage({ roomId, userId, msg }: { roomId: string; userId: number; msg: string }) {
    try {
        const savedMessage = await prisma.message.create({
            data: {
                roomId,
                userId,
                msg,
                createdAt: new Date(),
            },
        });
        return savedMessage;
    } catch (error) {
        console.error("Error saving message:", error);
        throw new Error("Failed to save message");
    }
}