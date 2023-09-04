import React, { useState, useEffect } from 'react';
import './../stylesheets/PostCreator.css';
import octopus from '../assets/octopus-tentacles.png';
import DropdownMenu from './Dropdown.jsx';


const PostCreator = (props) => {

const [createPost, setCreatePost] = useState('');

const handlePost = async () => {
  const results = await setCreatePost(createPost);
  setCreatePost(results || '')
}

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const inputStyles = {
  width: '100%',
  marginBottom: '10px'
}


  return (
      <div style={containerStyles} className='postCreator'>
        <div className="input-and-dropdown">
       <DropdownMenu/>
       <form>
       <input 
          type="text"
          value={createPost}
          onChange={(event) => setCreatePost(event.target.value)}
          style={inputStyles}
          className="post-input"
       />
       </form>
       </div>
       <button onClick={handlePost}>Post</button>
     </div>

  
  );
};

export default PostCreator;


