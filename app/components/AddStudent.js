/* eslint-disable complexity */
import React from 'react';
import { connect } from 'react-redux';
import { addStudentAsync } from '../redux/students';

class DisconnectedAddStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      gpa: 0.0,
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
      this.props.addStudentAsync(this.state, this.props.history);
    }
  }

  render() {
    return (
      <div className="big-card form">
        <form onSubmit={this.handleSubmit}>
          <div className="big-card-label">Add New Student</div>
          <div className="form-block">
            <label htmlFor="firstName">First Name:</label>
            <input
              onChange={this.handleChange}
              type="text"
              id="firstName"
              name="firstName"
            />
          </div>
          <div className="form-block">
            <label htmlFor="lastName">Last Name:</label>
            <input
              onChange={this.handleChange}
              type="text"
              id="lastName"
              name="lastName"
            />
          </div>
          <div className="form-block">
            <label htmlFor="email">Email:</label>
            <input
              onChange={this.handleChange}
              type="text"
              id="email"
              name="email"
            />
          </div>
          <div className="form-block">
            <label htmlFor="gpa">Grade Point Average:</label>
            <input
              onChange={this.handleChange}
              type="number"
              id="gpa"
              name="gpa"
            />
          </div>

          <div className="form-block">
            <button type="submit">Submit</button>
          </div>
          {this.state.validationMessage && (
            <div className="validation-message">
              {this.state.validationMessage}
            </div>
          )}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addStudentAsync: (student, history) =>
      dispatch(addStudentAsync(student, history))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(DisconnectedAddStudent);
