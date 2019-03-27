import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleCampus } from '../redux/selectedCampus';
import { deleteCampusAsync } from '../redux/campuses';

import SmallStudentCard from './SmallStudentCard';
import UpdateCampus from './UpdateCampus';
import BigCampusCard from './BigCampusCard';

class disconnectedSingleCampus extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUnenroll = this.handleUnenroll.bind(this);
    this.isEditFormOpen = this.isEditFormOpen.bind(this);
  }

  componentDidMount() {
    const { campusId } = this.props.match.params;
    this.props.fetchSingleCampus(campusId, this.props.history);
  }

  handleDelete(evt) {
    const campusId = this.props.selectedCampus.id;
    this.props.deleteCampusAsync(campusId, this.props.history, '/campuses');
  }

  handleUnenroll(evt) {
    evt.preventDefault();
    // TODO
    console.log('unenrolled!');
  }

  isEditFormOpen() {
    return this.props.location.pathname.split('/').pop() === 'edit';
  }

  render() {
    const campus = this.props.selectedCampus;

    return (
      <div>
        {!this.props.selectedCampus.id ? (
          <div className="sub-nav loading">Loading...</div>
        ) : (
          <div>
            <BigCampusCard
              campus={campus}
              isEditFormOpen={this.isEditFormOpen}
              handleDelete={this.handleDelete}
            />
            {this.isEditFormOpen() && (
              <UpdateCampus
                history={this.props.history}
                id={this.props.selectedCampus.id}
              />
            )}
            <div>
              {campus.students.length === 0 ? (
                <div className="sub-nav">
                  No students assigned to this campus
                </div>
              ) : (
                <div>
                  <div className="sub-nav">Students at {campus.name}:</div>
                  <div className="small-card-container student">
                    {campus.students.map(student => (
                      <SmallStudentCard
                        student={student}
                        key={student.id}
                        handleUnenroll={this.handleUnenroll}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
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
    fetchSingleCampus: (campusId, history) =>
      dispatch(fetchSingleCampus(campusId, history)),
    deleteCampusAsync: (campusId, history, redirectPath) =>
      dispatch(deleteCampusAsync(campusId, history, redirectPath))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(disconnectedSingleCampus);
