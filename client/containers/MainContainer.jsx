import React from 'react';
import './../stylesheets/MainContainer.css';
import Feed from '../components/Feed.jsx';
import PostCreator from '../components/PostCreator.jsx';
// IMPORT COMPONENTS
import DrawerAppBar from '../components/Menu.jsx';
import { useState, useEffect } from 'react';



const MainContainer = () => {
  const [prefs, setPrefs] = useState({
    motivation: false,
    milestones: false,
    mindfulness: false
  });



  return (
    <>
      <div id='menuBar'>
        <DrawerAppBar prefs={prefs} setPrefs={setPrefs} />
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
