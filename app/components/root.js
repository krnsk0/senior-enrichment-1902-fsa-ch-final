import React from 'react';
import { connect } from 'react-redux';
import { fetchStudents } from '../redux/students';
import { fetchCampuses } from '../redux/campuses';
import { Route, Link, withRouter, Switch } from 'react-router-dom';
import AllStudents from './AllStudents';
import AllCampuses from './AllCampuses';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import Topbar from './Topbar';
import AddCampus from './AddCampus';
import AddStudent from './AddStudent';
import NotFound404 from './NotFound404';
import NotFound500 from './NotFound500';

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
          <Switch>
            <Route exact path="/" component={AllCampuses} />
            <Route exact path="/campuses" component={AllCampuses} />
            <Route exact path="/campuses/add" component={AddCampus} />
            <Route exact path="/students" component={AllStudents} />
            <Route exact path="/students/add" component={AddStudent} />
            <Route exact path="/campuses/:campusId" component={SingleCampus} />
            <Route
              exact
              path="/students/:studentId"
              component={SingleStudent}
            />
            <Route exact path="/500" component={NotFound500} />
            <Route component={NotFound404} />
          </Switch>
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
