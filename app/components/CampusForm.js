import React from 'react';

const CampusForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-block">
        <label htmlFor="name">Campus Name:</label>
        <input
          onChange={props.handleChange}
          type="text"
          id="name"
          name="name"
          value={props.name}
        />
      </div>
      <div className="form-block">
        <label htmlFor="name">Campus Address:</label>
        <input
          onChange={props.handleChange}
          type="text"
          id="address"
          name="address"
          value={props.address}
        />
      </div>
      <div className="form-block">
        <label htmlFor="name">Description:</label>
        <textarea
          onChange={props.handleChange}
          type="text"
          name="description"
          value={props.description}
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

export default CampusForm;
