import { combineReducers } from 'redux';
import { students } from './students';
import { campuses } from './campuses';
import { selectedStudent } from './selectedStudent';
import { selectedCampus } from './selectedCampus';

const appReducer = combineReducers({
  students,
  campuses,
  selectedCampus,
  selectedStudent
});

export default appReducer;
