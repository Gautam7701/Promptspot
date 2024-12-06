"use client"
import {useState, usestate} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Profile from "@components/Profile";

import React, { useEffect } from 'react'

const MyProfile = () => {
    const{data:session}= useSession();
    const router = useRouter()

    const [posts, setposts] = useState([])

    useEffect(()=>{
        const fetchposts = async()=>{
          const response = await fetch(`/api/users/${session?.user.id}/posts`)
          const data = await response.json();
          console.log("Data passed to PromptCardList:", data);
          setposts(data);
        };
        if (session?.user.id)fetchposts();
    
      },[])

    const handleEdit = (post)=>{
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async(post)=>{
        const hasConfirmed = confirm("Are you sure u want to delete this prompt");

        if(hasConfirmed){
            try {
                await fetch(`/api/prompt/${post._id.toString()}`,{
                    method:"DELETE"
                });

                const filteredPosts = posts.filter((p)=>p._id !== post._id)

                setposts(filteredPosts)
                
            } catch (error) {
                console.log(error);
            }
        }
    }
  return (
    <Profile
    name="My"
    desc="Welcome to your personalized portfolio page"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  )
}

export default MyProfile
