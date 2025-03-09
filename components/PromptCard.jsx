"use client"
import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'



const PromptCard = ({post,handleTagClick, handleEdit, handleDelete}) => {
  const{data:session}= useSession()
  const pathname= usePathname();
  const router = useRouter();


  const [copied, setcopied] = useState("");


  const handlecopy=()=>{
    setcopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setcopied(false)      //change
    },3000);
  };

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };


  const creator = post.creator || {};
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-9'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer' onClick={handleProfileClick}>
        {post.creator && post.creator.image ? (
            <Image
              src={post.creator.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
          ) : (
            <div className="placeholder-image"></div>
          )}

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900 truncate'>{creator.username}</h3>
            <p className='font-inter text-sm text-gray-500 truncate'>{post.creator?.email || "No email available"}</p>

          </div>
        </div>

        <div className='copy_btn' onClick={handlecopy}>
          <Image
          src={copied==post.prompt
            ?"/assets/icons/tick4.jpg"
            :"/assets/icons/copy.svg"
          }
          width={22}
          height={22}
          alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
          // className='absolute top-20'
          />

        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-[#111111] truncate-prompt'>{post.prompt}</p>
      <p className='font-inter text-sm blue_gradient cursor-pointer'
      onClick={()=> handleTagClick && handleTagClick(post.tag)}
      >#{post.tag}</p>

      {session?.user.id ===creator._id && 
      pathname==="/profile" &&(

        
        <div className='mt-5 flex-center gap-4 border-t border-gray-400 pt-3 '>
          <p className='font-inter text-md text-[#111111] cursor-pointer' onClick={handleEdit}>
            Edit
          </p>
          <p className='font-inter text-md orange_gradient cursor-pointer' onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard
