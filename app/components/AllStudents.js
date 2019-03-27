import React from 'react';
import { connect } from 'react-redux';
import SmallStudentCard from './SmallStudentCard';
import { deleteStudentAsync } from '../redux/students';
import AddStudentButton from './AddStudentButton';

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
        {this.props.students.loaded === false ? (
          <div className="sub-nav loading">Loading...</div>
        ) : (
          <div>
            <AddStudentButton history={this.props.history} />
            <div className="small-card-container student">
              {this.props.students.length ? (
                this.props.students.map(student => {
                  return (
                    <SmallStudentCard
                      student={student}
                      key={student.id}
                      handleDelete={this.handleDelete}
                      displayEditDeleteLinks={true}
                    />
                  );
                })
              ) : (
                <div className="sub-nav loading">No Students Found</div>
              )}
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
