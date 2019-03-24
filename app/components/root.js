import React from 'react';
import { connect } from 'react-redux';
import { fetchStudents } from '../redux/students';
import { fetchCampuses } from '../redux/campuses';
import { Route } from 'react-router-dom';
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
        <nav>Welcome!</nav>
        <main>
          <Route exact path="/campuses" component={AllCampuses} />
          <Route exact path="/students" component={AllStudents} />
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchStudents: () => dispatch(fetchStudents()),
  fetchCampuses: () => dispatch(fetchCampuses())
});

export default connect(
  null,
  mapDispatchToProps
)(disconnectedRoot);
