import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleStudent } from '../redux/selectedStudent';
import { deleteStudentAsync } from '../redux/students';
import SmallCampusCard from './SmallCampusCard';
import UpdateStudent from './UpdateStudent';
import BigStudentCard from './BigStudentCard';

class disconnectedSingleStudent extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.isEditFormOpen = this.isEditFormOpen.bind(this);
  }

  componentDidMount() {
    const { studentId } = this.props.match.params;
    this.props.fetchSingleStudent(studentId, this.props.history);
  }

  handleDelete(evt) {
    const studentId = this.props.selectedStudent.id;
    this.props.deleteStudentAsync(studentId, this.props.history, '/students');
  }

  isEditFormOpen() {
    return this.props.location.pathname.split('/').pop() === 'edit';
  }

  render() {
    const student = this.props.selectedStudent;
    const studentName = student.firstName + ' ' + student.lastName;

    return (
      <div>
        {!this.props.selectedStudent.id ? (
          <div className="sub-nav loading">Loading...</div>
        ) : (
          <div>
            <BigStudentCard
              student={student}
              studentName={studentName}
              isEditFormOpen={this.isEditFormOpen}
              handleDelete={this.handleDelete}
            />
            {this.isEditFormOpen() && (
              <UpdateStudent
                history={this.props.history}
                id={this.props.selectedStudent.id}
              />
            )}
            <div>
              {student.campusId === null ? (
                <div className="sub-nav">
                  This student not assigned to a campus
                </div>
              ) : (
                <div>
                  <div className="sub-nav">This student attends:</div>
                  <div className="small-card-container campus">
                    <SmallCampusCard campus={student.campus} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
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
    fetchSingleStudent: (studentId, history) =>
      dispatch(fetchSingleStudent(studentId, history)),
    deleteStudentAsync: (studentId, history, redirectPath) =>
      dispatch(deleteStudentAsync(studentId, history, redirectPath))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(disconnectedSingleStudent);
