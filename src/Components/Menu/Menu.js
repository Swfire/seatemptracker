import React from 'react';
import { Link } from 'react-router-dom';

import WavesIcon from '@material-ui/icons/Waves';
import TimelineIcon from '@material-ui/icons/Timeline';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import './Menu.css';


function Menu(props) {
    return (
      <div className="menu">
        <Link to="/"><div className="menu__nappi"><WavesIcon htmlColor="#fff" /></div></Link>
        <Link to="/stats"><div className="menu__nappi"><TimelineIcon htmlColor="#fff" /></div></Link>
        <Link to="/settings"><div className="menu__nappi"><SettingsApplicationsIcon htmlColor="#fff" /></div></Link>
      </div>
    )
  }

export default Menu;