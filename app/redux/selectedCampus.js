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
export const fetchSingleCampus = campusId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/campuses/${campusId}`);
      dispatch(setSingleCampus(data));
    } catch (err) {
      console.log('Something went wrong getting a single campus', err);
    }
  };
};

// reducer
const initialState = { students: [] };
export const selectedCampus = (state = initialState, action) => {
  if (action.type === SET_SELECTED_CAMPUS) {
    return action.campus;
  } else if (action.type === DELETE_CAMPUS) {
    if (state.id === action.campusId) {
      return initialState;
    } else {
      return state;
    }
  } else {
    return state;
  }
};
