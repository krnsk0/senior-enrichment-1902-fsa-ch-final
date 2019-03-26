import React from 'react';
import { Link } from 'react-router-dom';

const SmallCampusCard = props => {
  const campus = props.campus;
  return (
    <div key={campus.id} className="small-card campus">
      <Link to={`/campuses/${campus.id}`}>
        <div className="small-card-label campus">{campus.name}</div>
        <img className="small-card-image campus" src={campus.imageUrl} />
      </Link>
      <div className="small-card-links-container campus">
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
