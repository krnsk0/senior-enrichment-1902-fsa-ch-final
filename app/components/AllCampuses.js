import React from 'react';
import { connect } from 'react-redux';

export const AllCampuses = props => {
  const imgStyle = {
    maxWidth: '100px',
    maxHeight: '100px',
    width: 'auto',
    height: 'auto'
  };

  return (
    <div>
      {props.campuses.length
        ? props.campuses.map(c => {
            return (
              <div key={c.id}>
                <h4>{c.name}</h4>
                <img src={c.imageUrl} style={imgStyle} />
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
