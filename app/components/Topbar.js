import React from 'react';
import { Link } from 'react-router-dom';

const Topbar = props => {
  return (
    <nav>
      <h3>Margaret Hamilton Interplanetary Academy of JavaScript</h3>
      <Link to="/">Home</Link>
      <Link to="/campuses">All Campuses</Link>
      <Link to="/students">All Students</Link>
    </nav>
  );
};

export default Topbar;
