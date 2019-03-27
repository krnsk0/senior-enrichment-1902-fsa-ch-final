import React from 'react';

const AddStudentButton = props => {
  return (
    <div className="sub-nav">
      <span className="nav-link">
        <button
          onClick={() => props.history.push('/campuses/add')}
          type="button"
        >
          Add New Student
        </button>
      </span>
    </div>
  );
};

export default AddStudentButton;
