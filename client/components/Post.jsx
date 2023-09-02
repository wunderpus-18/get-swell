import React, { useState, useEffect } from 'react';
import './../stylesheets/FirstComponent.css';
import octopus from './../assets/octopus-tentacles.png';

const Post = (props) => {
  // STATE HOOKS
  //HANDLERS

  // props.postInfo.userName , category, description, hypes
  // 

  return (
    <div class = 'post'>
      <p><b>Category: </b> {props.postInfo.category}</p>
      <p><b>{props.postInfo.userName}</b> {props.postInfo.description}</p>
      <p><b># Hypes: </b>{props.postInfo.hypes}</p>
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

