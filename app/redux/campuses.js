import axios from 'axios';

// action types
const SET_CAMPUSES = 'SET_CAMPUSES';
const ADD_CAMPUS = 'ADD_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';

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
export const deleteCampus = campusId => {
  return {
    type: DELETE_CAMPUS,
    campusId
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
export const addCampusAsync = (campus, history) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/campuses/', campus);
      // console.log('data', data);
      // TODO: handle validation errors
      dispatch(addCampus(data));
      history.push(`/campuses/${data.id}`);
    } catch (err) {
      console.log('Something went wrong adding a campus', err);
    }
  };
};
export const deleteCampusAsync = (campusId, history, redirectPath) => {
  return async dispatch => {
    try {
      const response = await axios.delete(`/api/campuses/${campusId}`);
      console.log('response from axios delete request in campuses', response);
      // TODO: handle delete failure in some way?
      if (response.status === 202) {
        dispatch(deleteCampus(campusId));
        history.push(redirectPath);
      }
    } catch (err) {
      console.log('Something went wrong deleting a campus', err);
    }
  };
};

// reducer
export const campuses = (state = [], action) => {
  if (action.type === SET_CAMPUSES) {
    return action.campuses;
  } else if (action.type === ADD_CAMPUS) {
    return [...state, action.campus];
  } else if (action.type === DELETE_CAMPUS) {
    return [...state.filter(campus => campus.id !== action.campusId)];
  } else {
    return state;
  }
};
