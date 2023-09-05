import React, { useState, useEffect } from 'react';
import './../stylesheets/PostCreator.css';
import octopus from '../assets/octopus-tentacles.png';
import DropdownMenu from './Dropdown.jsx';


const PostCreator = (props) => {

const { _id, userName } = props.user
const [postText, setPostText] = useState('');
const [postCategory, setPostCategory] = useState('Motivation');
const [postImage, setPostImage] = useState('');
const { feedChange, setFeedChange } = props;


const handleFileUpload = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    // console.log('reader.result:', reader.result)
    setPostImage(reader.result);
  };

  if (file) {
    reader.readAsDataURL(file);
    
  }
  // console.log('post image', postImage);

}

const handlePost =  () => {
  console.log('post image', postImage);
  fetch('/api/posts/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userID: _id,
      preference: postCategory,
      image: postImage,
      description: postText,
    })
  })
    .then ((response) => response.json())
    .then ((data) => {
      console.log('post successfully updated: ', data)
      setFeedChange(true); // this will re-render the feed
    })
    .catch((err) => {
      console.log('error: ', err);
    })
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
       <DropdownMenu postCategory={postCategory} setPostCategory={setPostCategory}/>
       <form>
          <input 
              type="text"
              value={postText}
              onChange={(event) => setPostText(event.target.value)}
              style={inputStyles}
              className="post-input"
          />
          <input 
              type='file'
              label='image'
              id='fileUpload'
              accept='.jpeg, .png, .txt'
              onChange={handleFileUpload}/> 
       </form>
       </div>
       <button onClick={() => handlePost()}>Post</button>
     </div>

  
  );
};


export default PostCreator;

