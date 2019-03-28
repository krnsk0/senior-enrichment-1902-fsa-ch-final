import React from 'react';

const CampusSelector = props => {
  let campusId;
  if (props.campusId == 0 || props.campusId === null) {
    campusId = 0;
  } else {
    campusId = props.campusId;
  }
  return (
    <div>
      <select
        onChange={props.handleChange}
        id="campusId"
        name="campusId"
        value={campusId}
      >
        <option key="0" value="0">
          None
        </option>
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
