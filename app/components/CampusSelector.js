import React from 'react';

const CampusSelector = props => {
  return (
    <div>
      <select
        onChange={props.handleChange}
        id="campusId"
        name="campusId"
        value={props.campusId}
      >
        {props.campuses.length &&
          props.campuses.map(campus => {
            return (
              <option key={campus.id} value={campus.id}>
                {campus.name}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default CampusSelector;
