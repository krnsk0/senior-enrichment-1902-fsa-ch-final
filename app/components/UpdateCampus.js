import React from 'react';
import { connect } from 'react-redux';
import { updateCampusAsync } from '../redux/campuses';
import CampusForm from './CampusForm';

class DisconnectedUpdateCampus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      address: this.props.address,
      description: this.props.description,
      id: this.props.id,
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
      const updateObject = {
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
        id: this.state.id
      };
      this.props.updateCampusAsync(updateObject, this.props.history);
    }
  }

  render() {
    return (
      <div className="big-card form">
        <div className="big-card-label">Update Campus</div>
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

const mapStateToProps = state => {
  return {
    name: state.selectedCampus.name,
    address: state.selectedCampus.address,
    description: state.selectedCampus.description,
    id: state.selectedCampus.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCampusAsync: (campus, history) =>
      dispatch(updateCampusAsync(campus, history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedUpdateCampus);
