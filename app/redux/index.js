import { combineReducers } from 'redux';
import { students } from './students';
import { campuses } from './campuses';

// This reducer is just a stub. We should probably do something
// with that combineReducers thing up there...
const appReducer = combineReducers({ students, campuses });

export default appReducer;
