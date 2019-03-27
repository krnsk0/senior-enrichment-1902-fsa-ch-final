import React from 'react';

const AddCampusButton = props => {
  return (
    <div className="sub-nav">
      <span className="nav-link">
        <button
          onClick={() => props.history.push('/campuses/add')}
          type="button"
        >
          Add New Campus
        </button>
      </span>
    </div>
  );
};

export default AddCampusButton;
