import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    console.log("Incoming POST request to /api/posts");

    // Authenticate the user
    const { userId: clerkId } = await auth();
    if (!clerkId) {
        console.error("Unauthorized request: No Clerk ID found");
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        // Parse the request body
        const { title, content } = await req.json();
        console.log("Request body:", { title, content });

        // Validate the request body
        if (!title || !content) {
            console.error("Validation error: Missing title or content");
            return new Response("Missing title or content", { status: 400 });
        }

        // Find the user in the database
        const user = await prisma.user.findUnique({
            where: { clerkId },
        });

        if (!user) {
            console.error("User not found for Clerk ID:", clerkId);
            return new Response("User not found", { status: 404 });
        }

        // Create the post in the database
        const post = await prisma.post.create({
            data: {
                clerkId,
                content,
                authorId: user.id,
            },
        });

        console.log("Post created successfully:", post);
        return new Response(JSON.stringify(post), { status: 201 });
    } catch (error) {
        console.error("Error in POST /api/posts:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}



export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: true, 
            },
        });

        return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}