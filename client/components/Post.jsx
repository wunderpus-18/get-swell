import React, { useState, useEffect } from 'react';
import './../stylesheets/Post.css';
import octopus from '../assets/octopus-tentacles.png';
import testImg from '../assets/testImg.js';

const Post = (props) => {
  const { setFeedChange, postInfo } = props;
  console.log('creating a post');
  console.log('postInfo:', postInfo);
  
  // const [selectedPref, setSelectedPref] = useState('');

  // const handlePrefChange = (event) => {
  //   setSelectedPref(event.target.value);
  // };
  


  //HANDLERS

  const deletePost = event => {
    const postID = event.target.parentNode.id;
    fetch(`/api/posts/${postID}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setFeedChange(true);
      })
      .catch(error => console.log(error));
  }

  // props.postInfo.userName , category, description, hypes
  // 
  // const imgToDisplay = props.postInfo.image.data;

  return (
    <div className='post' id={props.postInfo._id}>
      <img src={props.postInfo.image || octopus}></img>
      <p><b>Category: </b> {props.postInfo.preference}</p>
      <p><b>{props.postInfo.userID.userName}:</b> {props.postInfo.description}</p>
      <p><b>Hypes: </b>{props.postInfo.hypes}</p>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
};

export default Post;


// const activitySchema = new Schema( // this is a post
//     {
//       userName: { type: Schema.Types.ObjectId, ref: 'user', required: true },
//       category: String, // preference
//       image: Buffer, // stretch feature
//       description: String,
//       hypes: Number, // Likes
//       vibes: Array, // Comments ---> need a separate database for this
//     },
//     { timestamps: true },
//   );

