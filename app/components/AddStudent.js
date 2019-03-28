/* eslint-disable complexity */
import React from 'react';
import { connect } from 'react-redux';
import { addStudentAsync } from '../redux/students';
import StudentForm from './StudentForm';
import validateStudentForm from '../utils/validateStudentForm';

class DisconnectedAddStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      gpa: 0.0,
      campusId: this.props.campuses.length ? this.props.campuses[0].id : '0',
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
      this.props.addStudentAsync(this.state, this.props.history);
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
          campuses={this.props.campuses}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    campuses: state.campuses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addStudentAsync: (student, history) =>
      dispatch(addStudentAsync(student, history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedAddStudent);
