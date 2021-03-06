import React from 'react';
import { connect } from 'react-redux';
import { deleteCampusAsync } from '../redux/campuses';
import SmallCampusCard from './SmallCampusCard';
import AddCampusButton from './AddCampusButton';

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
        {this.props.campuses.loaded === false ? (
          <div className="sub-nav loading">Loading...</div>
        ) : (
          <div>
            <AddCampusButton history={this.props.history} />
            <div className="small-card-container campus">
              {this.props.campuses.length ? (
                this.props.campuses.map(campus => {
                  return (
                    <SmallCampusCard
                      campus={campus}
                      key={campus.id}
                      handleDelete={this.handleDelete}
                      displayEditDeleteLinks={true}
                    />
                  );
                })
              ) : (
                <div className="sub-nav loading">No Campuses Found</div>
              )}
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
