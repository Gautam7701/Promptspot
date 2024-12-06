import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import mongoose from "mongoose";

export const POST = async(req)=>{
    // const {userId,prompt,tag} = await req.json();

    try {
        const { userId, prompt, tag } = await req.json();

        // Log the data received
        console.log("Received data:", { userId, prompt, tag });
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return new Response("Invalid user ID", { status: 400 });
          }
        await connectToDB();
        const newPrompt= new Prompt ({
            creator:userId,
            tag,
            prompt
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt),{status:201})
    } catch (error) {
        console.error("Error creating new prompt:", error);
        return new Response("Failed to create a new prompt", {status:500});
    }
};
