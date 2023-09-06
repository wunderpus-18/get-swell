import React, { useState, useEffect } from 'react';
import './../stylesheets/Post.css';
import octopus from '../assets/octopus-tentacles.png';
import testImg from '../assets/testImg.js';

const Post = props => {
  const { setFeedChange, postInfo } = props;
  console.log('creating a post');
  console.log('postInfo:', postInfo);
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
  };

  return (
    <div className='post' id={props.postInfo._id}>
      <img src={props.postInfo.image || octopus}></img>
      <p>
        <b>Category: </b> {props.postInfo.preference}
      </p>
      <p>
        <b>{props.postInfo.userID.userName}:</b> {props.postInfo.description}
      </p>
      <p>
        <b>Hypes: </b>
        {props.postInfo.hypes}
      </p>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
};

export default Post;
