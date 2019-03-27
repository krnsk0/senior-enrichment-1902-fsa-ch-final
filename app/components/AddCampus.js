import React from 'react';
import { connect } from 'react-redux';
import { addCampusAsync } from '../redux/campuses';
import CampusForm from './CampusForm';
import validateCampusForm from '../utils/validateCampusForm';

class DisconnectedAddCampus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      description: '',
      validationMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const validationMessageArray = validateCampusForm(this.state);

    if (validationMessageArray.length) {
      this.setState({
        validationMessage: validationMessageArray.join(' ')
      });
    } else {
      this.props.addCampusAsync(this.state, this.props.history);
    }
  }

  render() {
    return (
      <div className="big-card form">
        <div className="big-card-label">Add New Campus</div>
        <CampusForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          validationMessage={this.state.validationMessage}
          name={this.state.name}
          address={this.state.address}
          description={this.state.description}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCampusAsync: (campus, history) =>
      dispatch(addCampusAsync(campus, history))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(DisconnectedAddCampus);
