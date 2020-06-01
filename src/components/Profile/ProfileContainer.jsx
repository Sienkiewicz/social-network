import React from 'react';
import Profile from './Profile';
import Axios from 'axios';
import { connect } from 'react-redux';
import { setUserProfile } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';

// First iteration

class ProfileContainer extends React.Component {
  componentDidMount() {
	  let userId = this.props.match.params.userId;
	  if(!userId) {
		  userId = 2;
	  }
    Axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then(
      (response) => {
        this.props.setUserProfile(response.data);
      }
    );
  }

  render() {
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
});

let withUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { setUserProfile })(
  withUrlDataContainerComponent
);
