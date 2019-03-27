import React from 'react';
import { connect } from 'react-redux';
import SmallStudentCard from './SmallStudentCard';
import { deleteStudentAsync } from '../redux/students';

class disconnectedAllStudents extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
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
                <button
                  onClick={() => this.props.history.push('/students/add')}
                  type="button"
                >
                  Add New Student
                </button>
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
                        displayEditDeleteLinks={true}
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
