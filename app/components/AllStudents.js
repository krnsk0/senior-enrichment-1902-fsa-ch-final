import React from 'react';
import { connect } from 'react-redux';

export const AllStudents = props => {
  console.log('AllStudents props: ', props);

  return (
    <div>
      {props.students.length
        ? props.students.map(s => {
            return (
              <div key={s.id}>
                <h4>
                  {s.firstName} {s.lastName}
                </h4>
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
