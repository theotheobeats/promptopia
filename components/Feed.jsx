'use client'

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick, handleNameClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleNameClick={handleNameClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value === '') {
      fetchPosts();
    }

    const filteredResult = filterData(value);
    setPosts(filteredResult);
  }

  const filterData = (value) => {
    return posts.filter(post =>
      (typeof post.creator.username === 'string' && post.creator.username.toLowerCase().includes(value.toLowerCase())) ||
      (typeof post.prompt === 'string' && post.prompt.toLowerCase().includes(value.toLowerCase())) ||
      (typeof post.tag === 'string' && post.tag.toLowerCase().includes(value.toLowerCase()))
    );
  }

  const fetchPosts = async () => {
    const response = await fetch('api/prompt');
    const data = await response.json();

    setPosts(data);
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);
    handleSearchChange({ target: { value: tag } });
  }

  const handleNameClick = (tag) => {
    
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        >

        </input>
      </form>
      <PromptCardList
        data={posts}
        handleNameClick={handleNameClick}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed