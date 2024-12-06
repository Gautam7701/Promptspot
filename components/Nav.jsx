"use client";

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {signIn, signOut, useSession, getProviders} from"next-auth/react"

const Nav = () => {
    const {data:session} = useSession();

    const [providers, setproviders] = useState(null);
    const [toggleDropdown, settoggleDropdown] = useState(false);

    useEffect(()=>{
         const setUpproviders = async()=>{
            const response= await getProviders();

            setproviders(response)
         }
         setUpproviders()

    },[])
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href="/" className='flex gap-2 flex-center'>
        <Image
        src="./assets/images/logo1.svg"
        width={40}
        height={40}
        alt='Logo'
        className='object-contain'
        />
        <p className='logo_text'>PromptSpot</p>
        </Link>


             {/* Desktop Navigation */}
        <div className='sm:flex hidden'>
            {session?.user?(
                <div className='flex gap-3 md:gap-5'>
                    <Link href="/create-prompt" className='black_btn'>
                    Create Post
                    </Link>

                    <button type='button' className='outline_btn' onClick={signOut}>
                        Sign Out
                    </button>

                    <Link href="/profile">
                    <Image
                    src={session?.user.image}
                    alt='Photo'
                    width={40}
                    height={40}
                    className='rounded-full'
                    />
                    </Link>
                </div>
            ):(
                <>
                {providers &&
                Object.values(providers).map((provider)=>(
                    <button
                    type='button'
                    key={provider.name}
                    onClick={()=>signIn(provider.id)}
                    className='black_btn'
                    >
                        Sign In
                    </button>
                ))}
 
                </>
            )}

        </div>


              {/* Mobile Navigation */}
        <div className='sm:hidden flex relative'>
            {session?.user?(
                <div className="flex-col">
                    <Image
                    src={session?.user.image}
                    alt='Profile'
                    width={37}
                    height={37}
                    className="rounded-full"
                    onClick={()=>settoggleDropdown((prev)=> !prev)}
                    />

                    {toggleDropdown && (
                        <div className='flex flex-col gap-3 mt-6 border-2 p-6 border-white-400'>
                            <Link href="/profile" className="dropdown_link bg-gray-400 rounded-full px-5 py-1.5"onClick={()=> settoggleDropdown(false)}>My Profile</Link>

                            <Link
                            href="/create-prompt"
                            className="dropdown_link bg-gray-400 rounded-full px-5 py-1.5"
                            onClick={()=> settoggleDropdown(false)}>
                            Create Prompt
                            </Link>
                            <button
                            type='button'
                            onClick={()=>{
                                settoggleDropdown(false);
                                signOut();
                            }}
                            className="mt-5 w-full black_btn bg-gray-400"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>

            ):(
                <>
                {providers &&
                Object.values(providers).map((provider)=>(
                    <button
                    type='button'
                    key={provider.name}
                    onClick={()=>signIn(provider.id)}
                    className='black_btn'
                    >
                        Sign In
                    </button>
                ))}
                </>
            )}
        </div>

    </nav>
  )
}

export default Nav

