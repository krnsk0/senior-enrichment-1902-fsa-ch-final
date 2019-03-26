import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleStudent } from '../redux/selectedStudent';
import { Link } from 'react-router-dom';
import SmallCampusCard from './SmallCampusCard';

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
                  <Link to={`/student/${student.id}/delete`} className="delete">
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
    fetchSingleStudent: studentId => dispatch(fetchSingleStudent(studentId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(disconnectedSingleStudent);
