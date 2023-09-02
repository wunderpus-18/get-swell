import React, { useState, useEffect } from 'react';
// import './../stylesheets/Post.css';
// import octopus from '../assets/octopus-tentacles.png';

const Post = (props) => {

  return (
    <div className='postCreator'>
        
      <img src={octopus}></img>
      <p><b>Category: </b> {props.postInfo.category}</p>
      <p><b>{props.postInfo.userName}</b> {props.postInfo.description}</p>
      <p><b># Hypes: </b>{props.postInfo.hypes}</p>
    </div>
  );
};

export default Post;
