import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const AllCampuses = props => {
  return (
    <div>
      {props.campuses.length
        ? props.campuses.map(c => {
            return (
              <div key={c.id}>
                <Link to={`/campuses/${c.id}`}>
                  <h4>{c.name}</h4>
                  <img src={c.imageUrl} />
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
