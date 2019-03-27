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
    this.state = {
      editFormOpen: props.editFormFlag || false
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleEditForm = this.toggleEditForm.bind(this);
  }

  componentDidMount() {
    const { campusId } = this.props.match.params;
    this.props.fetchSingleCampus(campusId, this.props.history);
    this.handleDelete = this.handleDelete.bind(this);
    console.log(this.props);
  }

  handleDelete(evt) {
    evt.preventDefault();
    const campusId = this.props.selectedCampus.id;
    this.props.deleteCampusAsync(campusId, this.props.history, '/campuses');
  }

  toggleEditForm(evt) {
    evt.preventDefault();
    this.setState({
      editFormOpen: !this.state.editFormOpen
    });
  }

  render() {
    const campus = this.props.selectedCampus;
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
                    <span>
                      [
                      <Link
                        to=""
                        className="edit"
                        onClick={this.toggleEditForm}
                      >
                        edit
                      </Link>
                      ]
                    </span>
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
            {this.state.editFormOpen && <UpdateCampus />}
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
