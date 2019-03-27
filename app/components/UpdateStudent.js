/* eslint-disable complexity */
import React from 'react';
import { connect } from 'react-redux';
import { updateStudentAsync } from '../redux/students';
import StudentForm from './StudentForm';
import validateStudentForm from '../utils/validateStudentForm';

class DisconnectedUpdateStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      gpa: this.props.gpa,
      id: this.props.id,
      campusId: this.props.campusId,
      validationMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const validationMessageArray = validateStudentForm(this.state);

    if (validationMessageArray.length) {
      this.setState({
        validationMessage: validationMessageArray.join(' ')
      });
    } else {
      const updateObject = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        gpa: this.state.gpa,
        id: this.state.id,
        campusId: this.state.campusId
      };
      this.props.updateStudentAsync(updateObject, this.props.history);
    }
  }

  render() {
    return (
      <div className="big-card form">
        <div className="big-card-label">Add New Student</div>
        <StudentForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          validationMessage={this.state.validationMessage}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          email={this.state.email}
          gpa={this.state.gpa}
          campusId={this.state.campusId}
          campuses={this.props.campuses}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    firstName: state.selectedStudent.firstName,
    lastName: state.selectedStudent.lastName,
    email: state.selectedStudent.email,
    gpa: state.selectedStudent.gpa,
    id: state.selectedStudent.id,
    campusId: state.selectedStudent.campusId,
    campuses: state.campuses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateStudentAsync: (student, history) =>
      dispatch(updateStudentAsync(student, history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedUpdateStudent);
