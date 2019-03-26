import React from 'react';
import { connect } from 'react-redux';
import SmallStudentCard from './SmallStudentCard';
import { Link } from 'react-router-dom';

export const AllStudents = props => {
  return (
    <div>
      <div className="sub-nav">
        <span className="nav-link">
          [<Link to="/students/add">Add New Student</Link>]
        </span>
      </div>
      <div className="small-card-container student">
        {props.students.length
          ? props.students.map(student => {
              return <SmallStudentCard student={student} key={student.id} />;
            })
          : 'No Students'}
      </div>
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
