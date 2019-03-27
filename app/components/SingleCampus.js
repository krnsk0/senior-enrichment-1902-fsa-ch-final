import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleCampus } from '../redux/selectedCampus';
import { deleteCampusAsync } from '../redux/campuses';
import { Link } from 'react-router-dom';
import SmallStudentCard from './SmallStudentCard';
import UpdateCampus from './UpdateCampus';

class disconnectedSingleCampus extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { campusId } = this.props.match.params;
    this.props.fetchSingleCampus(campusId, this.props.history);
  }

  handleDelete(evt) {
    evt.preventDefault();
    const campusId = this.props.selectedCampus.id;
    this.props.deleteCampusAsync(campusId, this.props.history, '/campuses');
  }

  render() {
    const campus = this.props.selectedCampus;
    const isEditFormOpen = () => {
      return this.props.location.pathname.split('/').pop() === 'edit';
    };

    return (
      <div>
        {!this.props.selectedCampus.id ? (
          <div className="sub-nav loading">Loading...</div>
        ) : (
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
                    {isEditFormOpen() ? (
                      <span>
                        [
                        <Link to={`/campuses/${campus.id}/`} className="edit">
                          edit
                        </Link>
                        ]
                      </span>
                    ) : (
                      <span>
                        [
                        <Link
                          to={`/campuses/${campus.id}/edit`}
                          className="edit"
                        >
                          edit
                        </Link>
                        ]
                      </span>
                    )}

                    <span>
                      [
                      <Link
                        to=""
                        className="delete"
                        onClick={this.handleDelete}
                      >
                        delete
                      </Link>
                      ]
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {isEditFormOpen() && (
              <UpdateCampus
                name={this.props.selectedCampus.name}
                address={this.props.selectedCampus.address}
                description={this.props.selectedCampus.description}
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
                      <SmallStudentCard student={student} key={student.id} />
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
