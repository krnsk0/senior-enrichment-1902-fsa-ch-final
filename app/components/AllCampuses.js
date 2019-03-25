import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const AllCampuses = props => {
  return (
    <div className="campus-container">
      {props.campuses.length
        ? props.campuses.map(c => {
            return (
              <div key={c.id} className="campus-card">
                <Link to={`/campuses/${c.id}`}>
                  <div className="campus-card-label">{c.name}</div>
                </Link>
                <div className="campus-buttons-container">
                  <span>
                    [<Link to="/">edit</Link>]
                  </span>
                  <span>
                    [<Link to="/">delete</Link>]
                  </span>
                </div>
                <Link to={`/campuses/${c.id}`}>
                  <img className="campus-image" src={c.imageUrl} />
                </Link>
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
