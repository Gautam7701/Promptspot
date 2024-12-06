"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import Form from '@components/Form';
import { useState } from 'react'
import { useSession } from 'next-auth/react'

const CreatePrompt = () => {

    const router = useRouter();
    const {data:session} = useSession();
    const [submitting, setsubmitting] = useState(false)
    const [post, setpost] = useState({
        prompt:"",
        tag:"",
    });

    const CreatePrompt = async(e)=>{
        e.preventDefault();
        console.log("Form submission triggered");
        console.log("Session data:", session);
        setsubmitting(true);

        try {
            const response = await fetch("/api/prompt/new",{
                method:"POST",
                headers: { "Content-Type": "application/json" }, 
                body:JSON.stringify({
                    prompt:post.prompt,
                    userId:session?.user.id,
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
    type="Create"
    post={post}
    setpost={setpost}
    submitting={submitting}
    handleSubmit={CreatePrompt}
    />
  )
}

export default CreatePrompt


