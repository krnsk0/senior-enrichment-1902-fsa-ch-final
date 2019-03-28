/* eslint-disable complexity */
/* eslint-disable no-useless-escape */
const validateStudentForm = state => {
  let validationMessageArray = [];
  if (state.firstName === '') {
    validationMessageArray.push('First name cannot be blank.');
  }
  if (state.lastName === '') {
    validationMessageArray.push('Last name cannot be blank.');
  }
  if (state.email === '') {
    validationMessageArray.push('Email cannot be blank.');
  }
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(state.email.toLowerCase())) {
    validationMessageArray.push('Email must be valid.');
  }
  if (state.gpa === '') {
    validationMessageArray.push('GPA cannot be blank.');
  }
  if (state.gpa < 0 || state.gpa > 4) {
    validationMessageArray.push('GPA must be a number between 0.0 and 4.0.');
  }
  return validationMessageArray;
};

export default validateStudentForm;
