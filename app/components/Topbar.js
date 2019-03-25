import React from 'react';
import { Link } from 'react-router-dom';

const Topbar = props => {
  return (
    <nav>
      <img id="hamilton-image" src="header.png" />
      <div className="header-text">Interplanetary Academy of Javascript</div>
      <div className="nav-link-container">
        [<Link to="/">Home</Link>] [<Link to="/campuses">All Campuses</Link>] [
        <Link to="/students">All Students</Link>]
      </div>
    </nav>
  );
};

export default Topbar;
