import axios from 'axios';

// action types
const SET_STUDENTS = 'SET_STUDENTS';
const ADD_STUDENT = 'ADD_STUDENTS';

// action creators
export const setStudents = students => {
  return {
    type: SET_STUDENTS,
    students
  };
};
export const addStudent = student => {
  return {
    type: ADD_STUDENT,
    student
  };
};

// thunks
export const fetchStudents = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/students');
      dispatch(setStudents(data));
    } catch (err) {
      console.log('Something went wrong getting the students', err);
    }
  };
};

// reducer
export const students = (state = [], action) => {
  if (action.type === SET_STUDENTS) {
    return action.students;
  } else {
    return state;
  }
};
