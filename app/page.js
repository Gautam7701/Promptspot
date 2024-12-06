import React from 'react'
import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
        <h1 className='head_text text-center'>Explore & Contribute
            <br className='max-md:hidden'/>
            <span className='orange_gradient text-center'>AI-Generated Prompts</span>
        </h1>
        <p className='desc text-center'>
            {/* Promptspot is an Open-source AI prompting tool for modern world to discover, create and share creative prompts */}
            PromptSpot is an open-source, AI-driven platform for discovering, creating, and sharing creative prompts.
        </p>

        <Feed/>

        
    </section>
  )
}

export default Home
