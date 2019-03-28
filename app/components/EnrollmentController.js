import React from 'react';
import CampusSelector from './CampusSelector';
import { connect } from 'react-redux';
import { enrollStudentAsync } from '../redux/students';

class DisconnectedEnrollmentController extends React.Component {
  constructor(props) {
    super(props);
    '*** CAMPUSES ***', this.props.campuses;
    this.state = {
      campusId: this.props.campuses.length && this.props.campuses[0].id
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: Number(evt.target.value)
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const studentId = this.props.selectedStudent.id;
    const campusId = this.state.campusId;
    const campusObject = this.props.campuses.find(
      // eslint-disable-next-line eqeqeq
      campus => campus.id == campusId
    );
    const history = this.props.history;
    const redirectPath = `/students/${studentId}`;

    this.props.enrollStudentAsync(
      studentId,
      campusId,
      campusObject,
      history,
      redirectPath
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-block">
          <CampusSelector
            handleChange={this.handleChange}
            campusId={this.state.campusId}
            campuses={this.props.campuses}
          />
        </div>
        <div className="form-block">
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    campuses: state.campuses,
    selectedStudent: state.selectedStudent
  };
};

const mapDispatchToProps = dispatch => {
  return {
    enrollStudentAsync: (
      studentId,
      campusId,
      campusObject,
      history,
      redirectPath
    ) =>
      dispatch(
        enrollStudentAsync(
          studentId,
          campusId,
          campusObject,
          history,
          redirectPath
        )
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedEnrollmentController);
