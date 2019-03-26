import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleCampus } from '../redux/selectedCampus';
import { Link } from 'react-router-dom';
import SmallStudentCard from './SmallStudentCard';

class disconnectedSingleCampus extends React.Component {
  componentDidMount() {
    const { campusId } = this.props.match.params;
    this.props.fetchSingleCampus(campusId);
  }

  render() {
    const campus = this.props.selectedCampus;
    return (
      <div>
        <div className="big-card campus">
          <div className="big-card-container campus">
            <img src={campus.imageUrl} className="big-card-image campus" />
            <div className="big-card-text-container campus">
              <div className="big-card-label campus">{campus.name}</div>
              <div className="big-card-address campus">
                Address: {campus.address}
              </div>
              <div className="big-card-description campus">
                {campus.description}
              </div>
              <div className="big-card-links-container campus">
                <span>
                  [
                  <Link to={`/campuses/${campus.id}/edit`} className="edit">
                    edit
                  </Link>
                  ]
                </span>
                <span>
                  [
                  <Link to={`/campuses/${campus.id}/delete`} className="delete">
                    delete
                  </Link>
                  ]
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="small-card-container student">
          {campus.students.length === 0
            ? 'No students assigned to this campus'
            : campus.students.map(student => {
                return <SmallStudentCard student={student} key={student.id} />;
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
