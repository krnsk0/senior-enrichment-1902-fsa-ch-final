const validateCampusForm = state => {
  let validationMessageArray = [];
  if (state.name === '') {
    validationMessageArray.push('Name cannot be blank.');
  }
  if (state.address === '') {
    validationMessageArray.push('Address cannot be blank.');
  }
  return validationMessageArray;
};
export default validateCampusForm;
