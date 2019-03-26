import React from 'react';
import { connect } from 'react-redux';
import SmallStudentCard from './SmallStudentCard';
import { deleteStudentAsync } from '../redux/students';
import { Link } from 'react-router-dom';

class disconnectedAllStudents extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    console.log(props);
  }

  handleDelete(evt, studentId) {
    evt.preventDefault();
    this.props.deleteStudentAsync(studentId, this.props.history, '/students');
  }

  render() {
    return (
      <div>
        {this.props.students.length === 0 ? (
          <div className="sub-nav loading">Loading...</div>
        ) : (
          <div>
            <div className="sub-nav">
              <span className="nav-link">
                [<Link to="/students/add">Add New Student</Link>]
              </span>
            </div>
            <div className="small-card-container student">
              {this.props.students.length
                ? this.props.students.map(student => {
                    return (
                      <SmallStudentCard
                        student={student}
                        key={student.id}
                        handleDelete={this.handleDelete}
                      />
                    );
                  })
                : 'No Students'}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => {
  return {
    students: state.students
  };
};

const mapDispatch = dispatch => {
  return {
    deleteStudentAsync: (studentId, history, redirectPath) =>
      dispatch(deleteStudentAsync(studentId, history, redirectPath))
  };
};

export default connect(
  mapState,
  mapDispatch
)(disconnectedAllStudents);
