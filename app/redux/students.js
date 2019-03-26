import axios from 'axios';

// action types
const SET_STUDENTS = 'SET_STUDENTS';
const ADD_STUDENT = 'ADD_STUDENTS';
const DELETE_STUDENT = 'DELETE_STUDENT';

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
export const deleteStudent = studentId => {
  return {
    type: DELETE_STUDENT,
    studentId
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

export const addStudentAsync = student => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/students/', student);
      // console.log('data', data);
      // TODO: handle validation errors
      dispatch(addStudent(data));
    } catch (err) {
      console.log('Something went wrong adding a student', err);
    }
  };
};

export const deleteStudentAsync = studentId => {
  return async dispatch => {
    try {
      const response = await axios.delete(`/api/students/${studentId}`);
      console.log('response from axios delete request in students', response);
      // TODO: handle delete failure in some way?
      if (response.status === 202) {
        dispatch(deleteStudent(studentId));
      }
    } catch (err) {
      console.log('Something went wrong deleting a student', err);
    }
  };
};

// reducer
export const students = (state = [], action) => {
  if (action.type === SET_STUDENTS) {
    return action.students;
  } else if (action.type === ADD_STUDENT) {
    return [...state, action.student];
  } else if (action.type === DELETE_STUDENT) {
    return [...state.filter(student => student.id !== action.studentId)];
  } else {
    return state;
  }
};
