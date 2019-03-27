import React from 'react';
import { connect } from 'react-redux';
import { addCampusAsync } from '../redux/campuses';
import CampusForm from './CampusForm';

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
    let validationMessageArray = [];
    if (this.state.name === '') {
      validationMessageArray.push('Name cannot be blank.');
    }
    if (this.state.address === '') {
      validationMessageArray.push('Address cannot be blank.');
    }

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
