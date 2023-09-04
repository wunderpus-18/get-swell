import React, { useState, useEffect } from 'react';
import './../stylesheets/Post.css';
import octopus from '../assets/octopus-tentacles.png';

const Post = (props) => {
  console.log('creating a post');
  
  // const [selectedPref, setSelectedPref] = useState('');

  // const handlePrefChange = (event) => {
  //   setSelectedPref(event.target.value);
  // };
  


  //HANDLERS

  // props.postInfo.userName , category, description, hypes
  // 
  // const imgToDisplay = props.postInfo.image.data;

  return (
    <div className='post'>
      <img src={octopus}></img>
      <p><b>Category: </b> {props.postInfo.preference}</p>
      <p><b>{props.postInfo.userID.userName}:</b> {props.postInfo.description}</p>
      <p><b>Hypes: </b>{props.postInfo.hypes}</p>
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

