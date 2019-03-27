import React from 'react';

const StudentForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-block">
        <label htmlFor="firstName">First Name:</label>
        <input
          onChange={props.handleChange}
          type="text"
          id="firstName"
          name="firstName"
          value={props.firstName}
        />
      </div>
      <div className="form-block">
        <label htmlFor="lastName">Last Name:</label>
        <input
          onChange={props.handleChange}
          type="text"
          id="lastName"
          name="lastName"
          value={props.lastName}
        />
      </div>
      <div className="form-block">
        <label htmlFor="email">Email:</label>
        <input
          onChange={props.handleChange}
          type="text"
          id="email"
          name="email"
          value={props.email}
        />
      </div>
      <div className="form-block">
        <label htmlFor="gpa">Grade Point Average:</label>
        <input
          onChange={props.handleChange}
          type="number"
          id="gpa"
          name="gpa"
          value={props.gpa}
        />
      </div>

      <div className="form-block">
        <button type="submit">Submit</button>
      </div>
      {props.validationMessage && (
        <div className="validation-message">{props.validationMessage}</div>
      )}
    </form>
  );
};

export default StudentForm;
