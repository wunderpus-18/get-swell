import React from 'react';
import './stylesheets/App.css';
import MainContainer from './containers/MainContainer';
import DrawerAppBar from './components/Menu.jsx';
const App = () => {
  return (
    <div id='app'>
      {/* <DrawerAppBar /> */}
      <MainContainer />
    </div>
  );
};

export default App;
