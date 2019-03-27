import React from 'react';
import { connect } from 'react-redux';
import { deleteCampusAsync } from '../redux/campuses';
import SmallCampusCard from './SmallCampusCard';

class disconnectedAllCampuses extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
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
                <button
                  onClick={() => this.props.history.push('/campuses/add')}
                  type="button"
                >
                  Add New Campus
                </button>
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
                        displayEditDeleteLinks={true}
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
