import React from 'react';
import { Link } from 'react-router-dom';

const Topbar = props => {
  return (
    <nav>
      <img id="hamilton-image" src="header.png" />
      <div className="header-text">Interplanetary Academy of Javascript</div>
      <div className="nav-link-container">
        <span className="nav-link">
          [<Link to="/campuses">All Campuses</Link>]
        </span>{' '}
        <span className="nav-link">
          [<Link to="/students">All Students</Link>]
        </span>
      </div>
    </nav>
  );
};

export default Topbar;
