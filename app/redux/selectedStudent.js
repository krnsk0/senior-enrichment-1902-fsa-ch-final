import axios from 'axios';

// action types
const SET_SELECTED_STUDENT = 'SET_SELECTED_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const UNENROLL_STUDENT = 'UNENROLL_STUDENT';
const ENROLL_STUDENT = 'ENROLL_STUDENT';

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
  } else if (action.type === UPDATE_STUDENT) {
    if (state.id === action.student.id) {
      return action.student;
    } else {
      return state;
    }
  } else if (action.type === UNENROLL_STUDENT) {
    return {
      ...state,
      campusId: null,
      campus: {}
    };
  } else if (action.type === ENROLL_STUDENT) {
    return {
      ...state,
      campusId: action.campusId,
      campus: action.campusObject
    };
  } else {
    return state;
  }
};
