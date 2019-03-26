import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const AllCampuses = props => {
  return (
    <div className="campus-card-container">
      {props.campuses.length
        ? props.campuses.map(c => {
            return (
              <div key={c.id} className="campus-card">
                <Link to={`/campuses/${c.id}`}>
                  <div className="campus-card-label">{c.name}</div>
                  <img className="campus-card-image" src={c.imageUrl} />
                </Link>
                <div className="campus-card-links-container">
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
          })
        : 'No Campuses'}
    </div>
  );
};

const mapState = state => {
  return {
    campuses: state.campuses
  };
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(
  mapState,
  mapDispatch
)(AllCampuses);
