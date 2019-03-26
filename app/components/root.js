import React from 'react';
import { connect } from 'react-redux';
import { fetchStudents } from '../redux/students';
import { fetchCampuses } from '../redux/campuses';
import { Route, Link, withRouter } from 'react-router-dom';
import AllStudents from './AllStudents';
import AllCampuses from './AllCampuses';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import Topbar from './Topbar';

class disconnectedRoot extends React.Component {
  componentDidMount() {
    this.props.fetchStudents();
    this.props.fetchCampuses();
  }
  render() {
    return (
      <div>
        <Topbar />
        <main>
          <Route exact path="/" component={AllCampuses} />
          <Route exact path="/campuses" component={AllCampuses} />
          <Route exact path="/students" component={AllStudents} />
          <Route path="/campuses/:campusId" component={SingleCampus} />
          <Route path="/students/:studentId" component={SingleStudent} />
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchStudents: () => dispatch(fetchStudents()),
  fetchCampuses: () => dispatch(fetchCampuses())
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(disconnectedRoot)
);
