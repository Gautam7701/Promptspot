"use client";
import React, { useEffect } from 'react'
import { useRouter,useSearchParams } from 'next/navigation';
import Form from '@components/Form';
import { useState } from 'react'
import { useSession } from 'next-auth/react'





const EditPrompt = () => {

    const router = useRouter();
    const {data:session} = useSession();
    const searchParams = useSearchParams();
    const promptId= searchParams.get("id");
    const [submitting, setsubmitting] = useState(false)
    const [post, setpost] = useState({
        prompt:"",
        tag:"",
    });



    useEffect(()=>{
        const getPromptDetails = async()=>{
            const response= await fetch(`/api/prompt/${prompt.id}`)
            const data= await response.json();

            setpost({
                prompt:data.prompt,
                tag:data.tag,
            })
        }
        if(promptId) getPromptDetails();
    },[promptId])
    const updatePrompt = async(e)=>{
        e.preventDefault();
        // console.log("Form submission triggered");
        // console.log("Session data:", session);
        setsubmitting(true);

        if(!promptId) return alert("Prompt Id is not found")

        try {
            const response = await fetch(`/api/prompt/${promptId}`,{
                method:"PATCH",
                headers: { "Content-Type": "application/json" }, 
                body:JSON.stringify({
                    prompt:post.prompt,
                    tag:post.tag
                })
            })

            console.log("Session data:", session);

            console.log("Data being sent:", {
                prompt: post.prompt,
                userId: session?.user.id,
                tag: post.tag,
              });

            if(response.ok){
                console.log("Prompt created successfully:", await response.json());
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally{
            setsubmitting(false);
        }
    }

  return (
    <Form
    type="Edit"
    post={post}
    setpost={setpost}
    submitting={submitting}
    handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt