import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const AllCampuses = props => {
  return (
    <div className="small-card-container">
      {props.campuses.length
        ? props.campuses.map(campus => {
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
