import React from 'react';
import { connect } from 'react-redux';

class DisconnectedAddCampus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      description: ''
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
    console.log(this.state);
  }

  render() {
    return (
      <div className="big-card form">
        <form onSubmit={this.handleSubmit}>
          <div className="big-card-label">Add New Campus</div>
          <div className="form-block">
            <label htmlFor="name">Campus Name:</label>
            <input
              onChange={this.handleChange}
              type="text"
              id="name"
              name="name"
            />
          </div>
          <div className="form-block">
            <label htmlFor="name">Campus Address:</label>
            <input
              onChange={this.handleChange}
              type="text"
              id="address"
              name="address"
            />
          </div>
          <div className="form-block">
            <label htmlFor="name">Description:</label>
            <textarea
              onChange={this.handleChange}
              type="text"
              name="description"
            />
          </div>
          <div className="form-block">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  null,
  mapDispatchToProps
)(DisconnectedAddCampus);
