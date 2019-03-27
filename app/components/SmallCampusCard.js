import React from 'react';
import { Link } from 'react-router-dom';

const SmallCampusCard = props => {
  const displayEditDeleteLinks = props.displayEditDeleteLinks || false;
  const campus = props.campus;
  return (
    <div key={campus.id} className="small-card campus">
      <Link to={`/campuses/${campus.id}`}>
        <div className="small-card-label campus">{campus.name}</div>
        <img className="small-card-image campus" src={campus.imageUrl} />
      </Link>
      {displayEditDeleteLinks && (
        <div className="small-card-links-container campus">
          <span>
            [
            <Link to={`/campuses/${campus.id}/edit`} className="edit">
              edit
            </Link>
            ]
          </span>
          <span>
            [
            <Link
              to=""
              className="delete"
              onClick={evt => props.handleDelete(evt, campus.id)}
            >
              delete
            </Link>
            ]
          </span>
        </div>
      )}
    </div>
  );
};

export default SmallCampusCard;
