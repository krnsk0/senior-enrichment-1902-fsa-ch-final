import axios from 'axios';

// action types
const SET_CAMPUSES = 'SET_CAMPUSES';
const ADD_CAMPUS = 'ADD_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

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
export const updateCampus = campus => {
  return {
    type: UPDATE_CAMPUS,
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
export const updateCampusAsync = (campus, history) => {
  return async dispatch => {
    try {
      const { data } = await axios.put(`/api/campuses/${campus.id}`, campus);
      // console.log('data', data);
      // TODO: handle validation errors
      dispatch(updateCampus(data));
      history.push(`/campuses/${data.id}`);
    } catch (err) {
      console.log('Something went wrong updating a campus', err);
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
  } else if (action.type === UPDATE_CAMPUS) {
    console.log('*** ACTION ***', action);
    return [
      ...state.map(campus => {
        if (campus.id !== action.campus.id) {
          return campus;
        } else {
          return action.campus;
        }
      })
    ];
  } else {
    return state;
  }
};
