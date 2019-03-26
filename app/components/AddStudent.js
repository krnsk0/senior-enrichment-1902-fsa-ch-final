import React from 'react';
import { connect } from 'react-redux';

class DisconnectedAddStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      gpa: 0.0
    };
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log(this.state);
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
              type="text"
              id="gpa"
              name="gpa"
            />
          </div>

          <div className="form-block">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  null,
  mapDispatchToProps
)(DisconnectedAddStudent);
