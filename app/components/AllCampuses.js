import React from 'react';
import { connect } from 'react-redux';
import { deleteCampusAsync } from '../redux/campuses';
import SmallCampusCard from './SmallCampusCard';
import { Link } from 'react-router-dom';

class disconnectedAllCampuses extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    console.log('initial props', props);
  }

  handleDelete(evt, campusId) {
    evt.preventDefault();
    this.props.deleteCampusAsync(campusId, this.props.history, '/campuses');
  }

  render() {
    return (
      <div>
        {this.props.campuses.length === 0 ? (
          <div className="sub-nav loading">Loading...</div>
        ) : (
          <div>
            <div className="sub-nav">
              <span className="nav-link">
                [<Link to="/campuses/add">Add New Campus</Link>]
              </span>
            </div>
            <div className="small-card-container campus">
              {this.props.campuses.length
                ? this.props.campuses.map(campus => {
                    return (
                      <SmallCampusCard
                        campus={campus}
                        key={campus.id}
                        handleDelete={this.handleDelete}
                      />
                    );
                  })
                : 'No Campuses'}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => {
  return {
    campuses: state.campuses
  };
};

const mapDispatch = dispatch => {
  return {
    deleteCampusAsync: (campusId, history, redirectPath) =>
      dispatch(deleteCampusAsync(campusId, history, redirectPath))
  };
};

export default connect(
  mapState,
  mapDispatch
)(disconnectedAllCampuses);
