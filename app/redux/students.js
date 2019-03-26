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
export const addStudentAsync = student => {
  return async dispatch => {
    try {
      const { newStudent } = await axios.post('/api/students/add', student);
      console.log('newStudent', newStudent);
      // TODO: handle validation errors
      dispatch(addStudent(newStudent));
    } catch (err) {
      console.log('Something went wrong adding a student', err);
    }
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
  } else if (action.type === ADD_STUDENT) {
    return [...state, action.student];
  } else {
    return state;
  }
};
