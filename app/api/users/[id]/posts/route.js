// import Prompt from "@models/prompt";
// import { connectToDB } from "@utils/database";

// export const GET = async (request,{params}) => {
//     try {
//         await connectToDB()

//         const prompts = await Prompt.find({
//             creator:params.id
//         }).populate('creator')

//         return new Response(JSON.stringify(prompts), { status: 200 })
//     } catch (error) {
//         return new Response("Failed to fetch all prompts", { status: 500 })
//     }
// } 

import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        // Ensure params is awaited correctly
        const { id } = await params;  // Ensure params are resolved

        const prompts = await Prompt.find({
            creator: id // Accessing the id after awaiting params
        }).populate('creator');

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
};
