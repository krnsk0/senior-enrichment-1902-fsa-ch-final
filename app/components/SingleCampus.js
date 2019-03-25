import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleCampus } from '../redux/selectedCampus';

class disconnectedSingleCampus extends React.Component {
  componentDidMount() {
    this.props.fetchSingleCampus(1);
  }

  render() {
    const campus = this.props.selectedCampus;
    return (
      <div>
        <div>{campus.name}</div>
        <img src={campus.imageUrl} />
        <div>Adress: {campus.address}</div>
        <div>Descritpion: {campus.description}</div>
        <div>Students:</div>
        {campus.students.length === 0
          ? 'No students'
          : campus.students.map(student => {
              const studentName = student.firstName + ' ' + student.lastName;
              return <div key={student.id}>{studentName}</div>;
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
