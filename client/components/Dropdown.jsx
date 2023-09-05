import React, {useState, useEffect} from 'react';
import Dropdown from 'react-dropdown'
// import 'react-dropdown/style.css';

const options = [
    'Motivation', 'Milestones', 'Mindfulness'
]
const DropdownMenu = (props) => {
    const dropdownStyles = {
       width: '300px', 
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center',
       marginBottom: '10px',
    }

    return (
      <div style={dropdownStyles}>

        <label>What's your vibe?</label>  

        <select>
            
            <option value="Motivation">Motivation</option>

            <option value="Milestones">Milestones</option>

            <option value="Mindfulness">Mindfulness</option>

        </select>
      </div>
    )
    


}

export default DropdownMenu;