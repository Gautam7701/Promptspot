"use client"
import React from 'react'
import PromptCard from './PromptCard'
import { useEffect, useState } from 'react'



const PromptCardList = ({data,handleTagClick})=>{
  return(
    <div className='mt-16 prompt_layout'>
      {data.map((post)=>(
        <PromptCard
        key={post?._id || Math.random()} 
        post={post}
        handleTagClick={handleTagClick}
        />
      ))}

    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  // const [posts, setposts] = useState([]);

  
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };


  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };


  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator?.username || "") ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };
 
  return (
    <section className='feed'>
      <form action="" className='relative w-full flex-center'>
        <input type="text" placeholder='Search for prompts' value={searchText} onChange={handleSearchChange} required className='search_input peer' />
      </form>
       {/* All Prompts */}
       {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}

    </section>
  );
};

export default Feed
