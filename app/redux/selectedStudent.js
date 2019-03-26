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
export const fetchSingleStudent = studentId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/students/${studentId}`);
      dispatch(setSingleStudent(data));
    } catch (err) {
      console.log('Something went wrong getting a single student', err);
    }
  };
};

// reducer
const initialState = { campus: {} };
export const selectedStudent = (state = initialState, action) => {
  if (action.type === SET_SELECTED_STUDENT) {
    return action.student;
  } else if (action.type === DELETE_STUDENT) {
    if (state.id === action.studentId) {
      return initialState;
    } else {
      return state;
    }
  } else {
    return state;
  }
};
