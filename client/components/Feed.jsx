import React, { useState, useEffect } from 'react'
import Post from './Post.jsx';
//const path = require('path');
import '../stylesheets/Feed.css'
//import PostCreator from './PostCreator.jsx';


const url = 'http://localhost:3000/api/posts'

const Feed = (props) => {
    const [ feedData, setFeedData] = useState([]);
    const { feedChange, setFeedChange } = props;
    useEffect(() => {
        fetch(url)
            .then( data => data.json() )
            .then( postObjArr => {
                // filter first?
                console.log(postObjArr);
                const filteredPostObjArr = postObjArr.filter ( (el) => props.prefs[el.preference] );
                setFeedData(filteredPostObjArr);
                setFeedChange(false);
            })        
        // const allPostsArr = makeFakePostsArr(40);
        // const filteredPostsArr = allPostsArr.filter ( (el) => props.prefs[el.category] );
        // setFeedData(filteredPostsArr);
    }, [props.prefs, props.feedChange]);

    const feedArray = [];

    for (let i = 0; i < feedData.length; i++) {
        feedArray.push(<Post key={i} postInfo={feedData[i]} feedChange={props.feedChange} setFeedChange={props.setFeedChange}/>)
        console.log(`<Post key=${i} postInfo=${feedData[i]}/>)`);
        console.log(feedData[i]);
    }

    return(
        <div className="feed-container">
        <div className="feed">
           {feedArray}
        </div>
    </div>
    )

};
 
export default Feed;


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


