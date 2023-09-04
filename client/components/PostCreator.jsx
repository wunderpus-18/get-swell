import React, { useState, useEffect } from 'react';
import './../stylesheets/PostCreator.css';
import octopus from '../assets/octopus-tentacles.png';

const PostCreator = (props) => {

const [createPost, setCreatePost] = useState('');


const handlePost = async () => {
  //const results = await postCreater(createPost);
  //setCreatePost(results.something || '')
  //setCreatePost('')
}



  return (
    <>
      <div className='postCreator'>

       <input 
          type="text"
          value={createPost}
          onChange={(event) => setCreatePost(event.target.value)}
          className="post-input"
       />
       <button onClick={handlePost}>Post</button>



     </div>
     </>

  
  );
};

export default PostCreator;
