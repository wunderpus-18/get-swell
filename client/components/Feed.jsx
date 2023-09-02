import React, { useState, useEffect } from 'react'
import Post from './Post.jsx';

function makeFakePostsArr (numPosts) {
    const fakePostsArr = [];

    const usernames = ['Meredith', 'Gayle', 'Ivy', 'Bryan', 'Moiz'];
    const preferences = ['motivation', 'milestone', 'mindfulness'];
    const descriptions = { motivation: 'Get motivated guys!', milestone: 'I just ran 50 lightyears', mindfulness: 'Be grateful guys! (And drink water)'};

    for (let i=0; i<numPosts; i++){
        const fakePostObj = {
            userName: usernames[Math.floor(Math.random()*usernames.length)],
            category: preferences[Math.floor(Math.random()*preferences.length)],
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

const Feed = () => {
    const [ feedData, setFeedData] = useState([])
    
    useEffect(() => {
        const data = makeFakePostsArr(40)
        setFeedData(data);
    }, []);

 

    const feedArray = [];


    for (let i = 0; i < feedData.length; i++) {
        feedArray.push(<Post postInfo={feedData[i]}/>)
    }

    return(
        <div className="feed">
            <h1>Feed</h1>
           {feedArray}
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


