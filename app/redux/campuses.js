import axios from 'axios';

// action types
const SET_CAMPUSES = 'SET_CAMPUSES';
const ADD_CAMPUS = 'ADD_CAMPUS';

// action creators
export const setCampuses = campuses => {
  return {
    type: SET_CAMPUSES,
    campuses
  };
};
export const addCampus = campus => {
  return {
    type: ADD_CAMPUS,
    campus
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
export const addCampusAsync = campus => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/campuses/', campus);
      // console.log('data', data);
      // TODO: handle validation errors
      dispatch(addCampus(data));
    } catch (err) {
      console.log('Something went wrong adding a campus', err);
    }
  };
};

// reducer
export const campuses = (state = [], action) => {
  if (action.type === SET_CAMPUSES) {
    return action.campuses;
  } else if (action.type === ADD_CAMPUS) {
    return [...state, action.campus];
  } else {
    return state;
  }
};
