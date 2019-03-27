import axios from 'axios';

// action types
const SET_SELECTED_CAMPUS = 'SET_SELECTED_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';

// action creators
export const setSingleCampus = campus => {
  return {
    type: SET_SELECTED_CAMPUS,
    campus
  };
};

// thunks
export const fetchSingleCampus = (campusId, history) => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/campuses/${campusId}`);
      dispatch(setSingleCampus(data));
    } catch (err) {
      if (err.response.status === 500) {
        history.push('/500');
      }
      if (err.response.status === 404) {
        history.push('/404');
      } else {
        console.log('Something went wrong getting a single campus', err);
      }
    }
  };
};

// reducer
const initialState = { students: [] };
export const selectedCampus = (state = initialState, action) => {
  if (action.type === SET_SELECTED_CAMPUS) {
    return action.campus;
  } else {
    return state;
  }
};
