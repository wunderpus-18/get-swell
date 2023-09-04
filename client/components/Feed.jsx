import React, { useState, useEffect } from 'react'
import Post from './Post.jsx';
//const path = require('path');
import '../stylesheets/Feed.css'
//import PostCreator from './PostCreator.jsx';


// const url = 'http://http://localhost:3000/api/users?userName=mfrazb'
// function fetchPosts (testUrl){
//     fetch(url)
//         .then( data => data.json )
//         .then( response => {
//             console.log(response);
//         })
// };
// fetchPosts(url);

function makeFakePostsArr (numPosts) {
    
    const fakePostsArr = [];
    
    const usernames = ['Meredith', 'Gayle', 'Ivy', 'Bryan', 'Moiz'];
    const preferences = ['Motivation', 'Milestones', 'Mindfulness'];
    const descriptions = { Motivation: 'Get motivated guys!', Milestones: 'I just ran 50 lightyears', Mindfulness: 'Be grateful guys! (And drink water)'};
    
    
    for (let i=0; i<numPosts; i++){
        const fakePostObj = {
            userName: usernames[Math.floor(Math.random()*(usernames.length))],
            category: preferences[Math.floor(Math.random()*(preferences.length))],
            image: '../assets/octopus-tentacles.png',
            hypes: 0
        }
        fakePostObj.description = descriptions[fakePostObj.category];
        
        fakePostsArr.push(fakePostObj);
    }

    return fakePostsArr;

}


// const Feed = (props) => {
//     const [feedData, setFeedData] = useState([]);
    
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('api endpoint');
//                 const data = await response.json();
//                 setFeedData(data);
//             }
//             catch(err) {
//                 console.log('Error fetching data', err)
//             }
//         };
//         fetchData();
//     }, [])
// }

const Feed = (props) => {
    const [ feedData, setFeedData] = useState([])
    
    useEffect(() => {
        
        const allPostsArr = makeFakePostsArr(40);

        // only filter those posts that match props.prefs

        const filteredPostsArr = allPostsArr.filter ( (el) => props.prefs[el.category] );
        // const filteredPostsArr = allPostsArr;



        setFeedData(filteredPostsArr);
    }, [props.prefs]);

 

    const feedArray = [];


    for (let i = 0; i < feedData.length; i++) {
        feedArray.push(<Post key={i} postInfo={feedData[i]}/>)
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


