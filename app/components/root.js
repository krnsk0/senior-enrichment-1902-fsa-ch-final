import React from 'react';
import { connect } from 'react-redux';
import { fetchStudents } from '../redux/students';
import { fetchCampuses } from '../redux/campuses';
import { Route, Link, withRouter } from 'react-router-dom';
import AllStudents from './AllStudents';
import AllCampuses from './AllCampuses';

class disconnectedRoot extends React.Component {
  componentDidMount() {
    this.props.fetchStudents();
    this.props.fetchCampuses();
  }
  render() {
    return (
      <div>
        <nav>
          <h3>Margaret Hamilton Interplanetary Academy of JavaScript</h3>
          <Link to="/">Home</Link>
          <Link to="/campuses">All Campuses</Link>
          <Link to="/students">All Students</Link>
        </nav>
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
