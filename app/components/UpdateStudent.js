/* eslint-disable complexity */
import React from 'react';
import { connect } from 'react-redux';
import { updateStudentAsync } from '../redux/students';
import StudentForm from './StudentForm';

class DisconnectedUpdateStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      gpa: this.props.gpa,
      id: this.props.id,
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
    let validationMessageArray = [];
    if (this.state.firstName === '') {
      validationMessageArray.push('First name cannot be blank.');
    }
    if (this.state.lastName === '') {
      validationMessageArray.push('Last name cannot be blank.');
    }
    if (this.state.email === '') {
      validationMessageArray.push('Email cannot be blank.');
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.state.email.toLowerCase())) {
      validationMessageArray.push('Email must be valid.');
    }
    if (this.state.gpa === '') {
      validationMessageArray.push('GPA cannot be blank.');
    }
    if (this.state.gpa < 0 || this.state.gpa > 4) {
      validationMessageArray.push('GPA must be between 0.0 and 4.0.');
    }

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
        id: this.state.id
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
    id: state.selectedStudent.id
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
