import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleCampus } from '../redux/selectedCampus';
import { Link } from 'react-router-dom';

class disconnectedSingleCampus extends React.Component {
  componentDidMount() {
    const { campusId } = this.props.match.params;
    this.props.fetchSingleCampus(campusId);
  }

  render() {
    const campus = this.props.selectedCampus;
    return (
      <div>
        <div>{campus.name}</div>
        <br />
        <img src={campus.imageUrl} />
        <br />
        <div>Address: {campus.address}</div>
        <br />
        <div>Descritpion: {campus.description}</div>
        <br />
        <div>Students:</div>
        {campus.students.length === 0
          ? 'No students assigned to this campus'
          : campus.students.map(student => {
              const studentName = student.firstName + ' ' + student.lastName;
              return (
                <div key={student.id}>
                  <Link to={`/students/${student.id}`}>{studentName}</Link>
                </div>
              );
            })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedCampus: state.selectedCampus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleCampus: campusId => dispatch(fetchSingleCampus(campusId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(disconnectedSingleCampus);
