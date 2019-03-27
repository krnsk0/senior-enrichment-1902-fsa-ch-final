import React from 'react';
import { Link } from 'react-router-dom';

const BigCampusCard = props => {
  return (
    <div className="big-card campus">
      <div className="big-card-container campus">
        <div className="big-card-image-container campus">
          <img src={props.campus.imageUrl} className="big-card-image campus" />
        </div>
        <div className="big-card-text-container campus">
          <div className="big-card-label campus">{props.campus.name}</div>
          <div className="big-card-address campus">
            Address: {props.campus.address}
          </div>
          <div className="big-card-description campus">
            {props.campus.description}
          </div>
          <div className="big-card-links-container campus">
            {props.isEditFormOpen() ? (
              <span>
                [
                <Link to={`/campuses/${props.campus.id}/`} className="edit">
                  close edit form
                </Link>
                ]
              </span>
            ) : (
              <span>
                [
                <Link to={`/campuses/${props.campus.id}/edit`} className="edit">
                  edit
                </Link>
                ]
              </span>
            )}
            <span>
              [
              <Link to="" className="delete" onClick={props.handleDelete}>
                delete
              </Link>
              ]
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigCampusCard;
