import axios from 'axios';

// action types
const SET_STUDENTS = 'SET_STUDENTS';
const ADD_STUDENT = 'ADD_STUDENTS';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const UNENROLL_STUDENT = 'UNENROLL_STUDENT';
const ENROLL_STUDENT = 'ENROLL_STUDENT';
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
export const updateStudent = student => {
  return {
    type: UPDATE_STUDENT,
    student
  };
};
export const unenrollStudent = studentId => {
  return {
    type: UNENROLL_STUDENT,
    studentId
  };
};
export const enrollStudent = (studentId, campusId, campusObject) => {
  return {
    type: ENROLL_STUDENT,
    studentId,
    campusId,
    campusObject
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

export const addStudentAsync = (student, history) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/students/', student);
      dispatch(addStudent(data));
      history.push(`/students/${data.id}`);
    } catch (err) {
      console.log('Something went wrong adding a student', err);
    }
  };
};

export const deleteStudentAsync = (studentId, history, redirectPath) => {
  return async dispatch => {
    try {
      const response = await axios.delete(`/api/students/${studentId}`);
      console.log('response from axios delete request in students', response);
      if (response.status === 202) {
        dispatch(deleteStudent(studentId));
        history.push(redirectPath);
      }
    } catch (err) {
      console.log('Something went wrong deleting a student', err);
    }
  };
};
export const updateStudentAsync = (student, history) => {
  return async dispatch => {
    try {
      const { data } = await axios.put(`/api/students/${student.id}`, student);
      dispatch(updateStudent(data));
      history.push(`/students/${data.id}`);
    } catch (err) {
      console.log('Something went wrong updating a student', err);
    }
  };
};
export const unenrollStudentAsync = (studentId, history, redirectPath) => {
  return async dispatch => {
    try {
      await axios.put(`/api/students/${studentId}`, {
        campusId: null
      });
      dispatch(unenrollStudent(studentId));
      history.push(redirectPath);
    } catch (err) {
      console.log('Something went wrong unenrolling a student', err);
    }
  };
};
export const enrollStudentAsync = (
  studentId,
  campusId,
  campusObject,
  history,
  redirectPath
) => {
  return async dispatch => {
    // eslint-disable-next-line eqeqeq
    campusId = campusId == 0 ? null : campusId;
    try {
      await axios.put(`/api/students/${studentId}`, {
        campusId
      });
      dispatch(enrollStudent(studentId, campusId, campusObject));
      history.push(redirectPath);
    } catch (err) {
      console.log('Something went wrong enrolling a student', err);
    }
  };
};

// reducer
const initialState = [];
initialState.loaded = false;
export const students = (state = initialState, action) => {
  if (action.type === SET_STUDENTS) {
    const newState = action.students;
    newState.loaded = true;
    return newState;
  } else if (action.type === ADD_STUDENT) {
    return [...state, action.student];
  } else if (action.type === DELETE_STUDENT) {
    return [...state.filter(student => student.id !== action.studentId)];
  } else if (action.type === UPDATE_STUDENT) {
    return [
      ...state.map(student => {
        if (student.id !== action.student.id) {
          return student;
        } else {
          return action.student;
        }
      })
    ];
    // skipping handling some actions here because
    // it is impossible to view the students leaf of
    // the state tree without triggering a GET that
    // syncs with server, so no need to handle them.
    // Would need to handle if we expanded app more.
  } else {
    return state;
  }
};
