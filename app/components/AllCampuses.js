import React from 'react';

export const AllCampuses = props => {
  return (
    <div>
      {props.campuses.length
        ? props.campuses.map(c => {
            return (
              <div key={c.id}>
                <h4>{c.name}</h4>
                <img src={c.imageUrl} />
              </div>
            );
          })
        : 'No Campuses'}
    </div>
  );
};

// Currently, we're just exporting the component as-is. When we're ready to
// hook it up to the redux store, we'll export the connected component by default:
// export default connect(mapState, mapDispatch)(AllCampuses)
export default AllCampuses;
