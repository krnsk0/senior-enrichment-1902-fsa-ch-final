import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleStudent } from '../redux/selectedStudent';
import { deleteStudentAsync } from '../redux/students';
import { Link } from 'react-router-dom';
import SmallCampusCard from './SmallCampusCard';

class disconnectedSingleStudent extends React.Component {
  componentDidMount() {
    const { studentId } = this.props.match.params;
    this.props.fetchSingleStudent(studentId);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(evt) {
    evt.preventDefault();
    const studentId = this.props.selectedStudent.id;
    this.props.deleteStudentAsync(studentId, this.props.history, '/students');
  }

  render() {
    const student = this.props.selectedStudent;
    const studentName = student.firstName + ' ' + student.lastName;
    return (
      <div>
        <div className="big-card student">
          <div className="big-card-container student">
            <img src={student.imageUrl} className="big-card-image student" />
            <div className="big-card-text-container student">
              <div className="big-card-label student">{studentName}</div>
              <div className="big-card-description campus">
                Email: {student.email}
              </div>
              <div className="big-card-description campus">
                GPA: {student.gpa}
              </div>
              <div className="big-card-links-container student">
                <span>
                  [
                  <Link to={`/student/${student.id}/edit`} className="edit">
                    edit
                  </Link>
                  ]
                </span>
                <span>
                  [
                  <Link to="" className="delete" onClick={this.handleDelete}>
                    delete
                  </Link>
                  ]
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="small-card-container campus">
          {student.campusId === null ? (
            'This student not assigned to a campus'
          ) : (
            <SmallCampusCard campus={student.campus} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedStudent: state.selectedStudent
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleStudent: studentId => dispatch(fetchSingleStudent(studentId)),
    deleteStudentAsync: (studentId, history, redirectPath) =>
      dispatch(deleteStudentAsync(studentId, history, redirectPath))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(disconnectedSingleStudent);
