import React from 'react';
import { connect } from 'react-redux';
import SmallStudentCard from './SmallStudentCard';

export const AllStudents = props => {
  return (
    <div className="small-card-container student">
      {props.students.length
        ? props.students.map(student => {
            return <SmallStudentCard student={student} key={student.id} />;
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
