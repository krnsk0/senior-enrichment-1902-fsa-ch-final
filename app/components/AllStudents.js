import React from 'react';

export const AllStudents = props => {
  return (
    <div>
      {props.students.length
        ? props.students.map(s => {
            return (
              <div key={s.id}>
                <h4>
                  {s.firstName} {s.lastName}
                </h4>
              </div>
            );
          })
        : 'No Students'}
    </div>
  );
};

// Currently, we're just exporting the component as-is. When we're ready to
// hook it up to the redux store, we'll export the connected component by default:
// export default connect(mapState, mapDispatch)(AllStudents)
export default AllStudents;
