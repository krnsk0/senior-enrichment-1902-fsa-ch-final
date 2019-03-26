import React from 'react';
import { connect } from 'react-redux';
import SmallCampusCard from './SmallCampusCard';
import { Link } from 'react-router-dom';

export const AllCampuses = props => {
  return (
    <div>
      <div className="sub-nav">
        <span className="nav-link">
          [<Link to="/campuses/add">Add New Campus</Link>]
        </span>
      </div>
      <div className="small-card-container campus">
        {props.campuses.length
          ? props.campuses.map(campus => {
              return <SmallCampusCard campus={campus} key={campus.id} />;
            })
          : 'No Campuses'}
      </div>
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
