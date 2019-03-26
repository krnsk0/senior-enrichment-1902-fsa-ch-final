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
        <div className="big-card">
          <div className="big-card-container">
            <img src={campus.imageUrl} className="big-card-image" />
            <div className="big-card-text-container">
              <div className="big-card-label">{campus.name}</div>
              <div className="big-card-address">Address: {campus.address}</div>
              <div className="big-card-description">{campus.description}</div>
              <div className="big-card-links-container">
                <span>
                  [
                  <Link to="/" className="edit">
                    edit
                  </Link>
                  ]
                </span>
                <span>
                  [
                  <Link to="/" className="delete">
                    delete
                  </Link>
                  ]
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="small-card-container">
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
