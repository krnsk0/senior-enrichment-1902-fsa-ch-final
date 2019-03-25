import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const AllStudents = props => {
  return (
    <div>
      {props.students.length
        ? props.students.map(s => {
            return (
              <div key={s.id}>
                <Link to={`/students/${s.id}`}>
                  <h4>
                    {s.firstName} {s.lastName}
                  </h4>
                </Link>
              </div>
            );
          })
        : 'No Students'}
    </div>
  );
};

const mapState = state => {
  return {
    students: state.students
  };
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(
  mapState,
  mapDispatch
)(AllStudents);
