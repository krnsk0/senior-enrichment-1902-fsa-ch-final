import axios from 'axios';

// action types
const SET_CAMPUSES = 'SET_CAMPUSES';

// action creators
export const setCampuses = campuses => {
  return {
    type: SET_CAMPUSES,
    campuses
  };
};

// thunks
export const fetchCampuses = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/campuses');
      dispatch(setCampuses(data));
    } catch (err) {
      console.log('Something went wrong getting the campuses', err);
    }
  };
};

// reducer
export const campuses = (state = [], action) => {
  if (action.type === SET_CAMPUSES) {
    return action.campuses;
  } else {
    return state;
  }
};
