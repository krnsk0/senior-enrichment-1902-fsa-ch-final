import React from 'react';
import { Link } from 'react-router-dom';

const SmallCampusCard = props => {
  const campus = props.campus;
  return (
    <div key={campus.id} className="card">
      <Link to={`/campuses/${campus.id}`}>
        <div className="card-label">{campus.name}</div>
        <img className="card-image" src={campus.imageUrl} />
      </Link>
      <div className="card-links-container">
        <span>
          [
          <Link to="/" className="edit">
            edit
          </Link>
          ]
        </span>
        <span>
          [
          <Link to="/" className="delete">
            delete
          </Link>
          ]
        </span>
      </div>
    </div>
  );
};

export default SmallCampusCard;
