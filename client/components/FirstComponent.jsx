import React, { useState, useEffect } from 'react';
import './../stylesheets/FirstComponent.css';
import octopus from './../assets/octopus-tentacles.png';

const FirstComponent = () => {
  // STATE HOOKS
  //HANDLERS
  const buttonHandler = event => {
    const answer = event.target.nextSibling;
    answer.classList.remove('hidden');
  };

  return (
    <div className='joke'>
      <button onClick={buttonHandler}>What do you call octopus twins? </button>
      <p className='hidden'>I-tentacle :)</p>
      <img className='octopus' src={octopus}></img>
    </div>
  );
};

export default FirstComponent;
