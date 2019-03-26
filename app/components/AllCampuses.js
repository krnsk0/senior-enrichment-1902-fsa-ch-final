import React from 'react';
import { connect } from 'react-redux';
import SmallCampusCard from './SmallCampusCard';

export const AllCampuses = props => {
  return (
    <div className="small-card-container">
      {props.campuses.length
        ? props.campuses.map(campus => {
            return <SmallCampusCard campus={campus} key={campus.id} />;
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
