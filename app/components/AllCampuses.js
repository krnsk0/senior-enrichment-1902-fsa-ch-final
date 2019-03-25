import React from 'react';
import { connect } from 'react-redux';

export const AllCampuses = props => {
  console.log('AllCampuses props: ', props);

  return (
    <div>
      {props.campuses.length
        ? props.campuses.map(c => {
            return (
              <div key={c.id}>
                <h4>{c.name}</h4>
                <img src={c.imageUrl} />
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
