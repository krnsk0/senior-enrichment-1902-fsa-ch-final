import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const AllStudents = props => {
  return (
    <div className="small-card-container">
      {props.students.length
        ? props.students.map(student => {
            return (
              <div key={student.id} className="card">
                <Link to={`/students/${student.id}`}>
                  <div className="card-label">
                    {student.firstName} {student.lastName}
                  </div>
                  <img className="card-image" src={student.imageUrl} />
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
