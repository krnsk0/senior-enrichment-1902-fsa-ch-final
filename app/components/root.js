import React from 'react';
import { connect } from 'react-redux';
import { fetchStudents } from '../redux/students';
import { fetchCampuses } from '../redux/campuses';
import { Route, Link, withRouter } from 'react-router-dom';
import AllStudents from './AllStudents';
import AllCampuses from './AllCampuses';
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
          <Route path="/campuses" component={AllCampuses} />
          <Route path="/students" component={AllStudents} />
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
