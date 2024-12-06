// "use client";
// import React, { useEffect } from 'react'
// import { useRouter,useSearchParams } from 'next/navigation';
// import Form from '@components/Form';
// import { useState } from 'react'
// import { useSession } from 'next-auth/react'

// const EditPrompt = () => {

//     const router = useRouter();
//     const {data:session} = useSession();
//     const searchParams = useSearchParams();
//     const promptId= searchParams.get("id");
//     const [submitting, setsubmitting] = useState(false)
//     const [post, setpost] = useState({
//         prompt:"",
//         tag:"",
//     });



//     useEffect(()=>{
//         const getPromptDetails = async()=>{
//             const response= await fetch(`/api/prompt/${promptId}`)
//             const data= await response.json();

//             setpost({
//                 prompt:data.prompt,
//                 tag:data.tag,
//             })
//         }
//         if(promptId) getPromptDetails();
//     },[promptId])
//     const updatePrompt = async(e)=>{
//         e.preventDefault();
//         // console.log("Form submission triggered");
//         // console.log("Session data:", session);
//         setsubmitting(true);

//         if(!promptId) return alert("Prompt Id is not found")

//         try {
//             const response = await fetch(`/api/prompt/${promptId}`,{
//                 method:"PATCH",
//                 headers: { "Content-Type": "application/json" }, 
//                 body:JSON.stringify({
//                     prompt:post.prompt,
//                     tag:post.tag
//                 })
//             })

//             console.log("Session data:", session);

//             console.log("Data being sent:", {
//                 prompt: post.prompt,
//                 userId: session?.user.id,
//                 tag: post.tag,
//               });

//             if(response.ok){
//                 console.log("Prompt created successfully:", await response.json());
//                 router.push("/");
//             }
//         } catch (error) {
//             console.log(error);
//         } finally{
//             setsubmitting(false);
//         }
//     }

//   return (
//     <Form
//     type="Edit"
//     post={post}
//     setpost={setpost}
//     submitting={submitting}
//     handleSubmit={updatePrompt}
//     />
//   )
// }

// export default EditPrompt




"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';
import { useSession } from 'next-auth/react';

const EditPrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const promptId = searchParams?.get("id"); // Add optional chaining to handle cases where it's undefined
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });

    // Fetch prompt details
    useEffect(() => {
        const getPromptDetails = async () => {
            try {
                const response = await fetch(`/api/prompt/${promptId}`);
                const data = await response.json();
                setPost({
                    prompt: data.prompt,
                    tag: data.tag,
                });
            } catch (error) {
                console.error("Error fetching prompt details:", error);
            }
        };

        if (promptId) getPromptDetails();
    }, [promptId]);

    // Update prompt
    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) {
            alert("Prompt ID not found");
            return;
        }

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            });

            if (response.ok) {
                console.log("Prompt updated successfully:", await response.json());
                router.push("/");
            } else {
                console.error("Failed to update prompt");
            }
        } catch (error) {
            console.error("Error updating prompt:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    );
};

export default function PageWrapper() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <EditPrompt />
        </React.Suspense>
    );
};