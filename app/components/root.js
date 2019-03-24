import React from 'react';
import { connect } from 'react-redux';
import { fetchStudents } from '../redux/students';
import { fetchCampuses } from '../redux/campuses';

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
          <h1>Welcome to the Margaret Hamilton Academy of JavaScript!</h1>
          <p>This seems like a nice place to get started with some Routes!</p>
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
