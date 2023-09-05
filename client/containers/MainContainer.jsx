import React from 'react';
import './../stylesheets/MainContainer.css';
import Feed from '../components/Feed.jsx';
import PostCreator from '../components/PostCreator.jsx';
// IMPORT COMPONENTS
import DrawerAppBar from '../components/Menu.jsx';
import { useState, useEffect } from 'react';

const getUserUrl = 'http://localhost:3000/api/users?userName=';



const MainContainer = () => { // changed this to capital
  const [prefs, setPrefs] = useState({
    Motivation: false,
    Milestones: false,
    Mindfulness: false
  });
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  function getUserAndUpdatePrefs (userName){
    fetch(getUserUrl+userName)
      .then(data => data.json())
      .then(userInfo => {
        // console.log(userInfo);
        setUser(userInfo);
        const lowercaseKeys = Object.keys(userInfo.preferences);
        console.log('prev prefs', userInfo.preferences);
        const uppercaseKeys = lowercaseKeys.map( key => key[0].toUpperCase()+key.slice(1));
        const newPrefsObj = {};
        for (let i = 0; i < lowercaseKeys.length; i++){
          // the code here accounts for handling how the prefs object is written
          // lowercase motivation vs uppercase, string boolean vs boolean boolean
          newPrefsObj[uppercaseKeys[i]] = userInfo.preferences[lowercaseKeys[i]] === 'true' || userInfo.preferences[lowercaseKeys[i]] === true;
        };
        console.log('new prefs before updating state:', newPrefsObj);
        setPrefs(newPrefsObj); // 'motivation' 'Motivation'
      })
  };

  console.log('the new prefs state is: ', prefs);

  useEffect(() => {
    console.log('getting user and updating prefs');
    getUserAndUpdatePrefs('gayle'); // hard-coded for now
  }, [isLoggedIn]);


  // getUser('gayle'); // hard-coded

  return (
    <>
      <div id='menuBar'>
        <DrawerAppBar
        prefs={prefs} setPrefs={setPrefs}
        user={user} setUser={setUser} />
      </div>
      <div id='postCreator'>
        <PostCreator />
      </div>
      <div id='feed'>
        
        <Feed prefs={prefs} setPrefs={setPrefs} />
      </div>
    </>
  );
};

export default MainContainer;
