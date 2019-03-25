import axios from 'axios';

// action types
const SET_SELECTED_STUDENT = 'SET_SELECTED_STUDENT';

// action creators
export const setSingleStudnet = student => {
  return {
    type: SET_SELECTED_STUDENT,
    student
  };
};

// thunks
export const fetchSingleCampus = studentId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/campuses/${studentId}`);
      dispatch(setSingleStudent(data));
    } catch (err) {
      console.log('Something went wrong getting a single student', err);
    }
  };
};

// reducer
export const selectedStudent = (state = {}, action) => {
  if (action.type === SET_SELECTED_STUDENT) {
    return action.student;
  } else {
    return state;
  }
};
