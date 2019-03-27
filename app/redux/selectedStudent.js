import axios from 'axios';

// action types
const SET_SELECTED_STUDENT = 'SET_SELECTED_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';

// action creators
export const setSingleStudent = student => {
  return {
    type: SET_SELECTED_STUDENT,
    student
  };
};

// thunks
export const fetchSingleStudent = (studentId, history) => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/students/${studentId}`);
      dispatch(setSingleStudent(data));
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
const initialState = { campus: {} };
export const selectedStudent = (state = initialState, action) => {
  if (action.type === SET_SELECTED_STUDENT) {
    return action.student;
  } else {
    return state;
  }
};
