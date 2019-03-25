import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleStudent } from '../redux/selectedStudent';
import { Link } from 'react-router-dom';

class disconnectedSingleStudent extends React.Component {
  componentDidMount() {
    const { studentId } = this.props.match.params;
    this.props.fetchSingleStudent(studentId);
  }

  render() {
    const student = this.props.selectedStudent;
    const studentName = student.firstName + ' ' + student.lastName;
    return (
      <div>
        <div>{studentName}</div>
        <br />

        <img src={student.imageUrl} />
        <br />
        <div>Email: {student.email}</div>
        <br />
        <div>GPA: {student.gpa}</div>
        <br />
        <div>Campus:</div>
        {student.campusId === null ? (
          'This student not assigned to a campus'
        ) : (
          <div>
            <Link to={`/campuses/${student.campusId}`}>
              {student.campus.name}
            </Link>
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
    fetchSingleStudent: studentId => dispatch(fetchSingleStudent(studentId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(disconnectedSingleStudent);
